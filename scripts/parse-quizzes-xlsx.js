#!/usr/bin/env node
/**
 * Parses Excel quiz files (e.g. xlsx/Security Fundamentals.xlsx) where each
 * question is a separate sheet, and appends/updates questions in src/data/quizzes.json.
 *
 * Quiz title and identity come from the filename (e.g. "Intro to Crypto.xlsx" → quiz title "Intro to Crypto").
 * Each file creates or updates one quiz; a new file always gets a new id and never appends to another quiz.
 *
 * Expected sheet layout (from Kahoot-style export):
 *   A1: Quiz title (display only; quiz identity is the filename)
 *   A2: Question number and type (e.g. "1 True or False", "3 Quiz", "11 Multiple select Quiz")
 *   B2: Question text (HTML allowed; preserved as-is)
 *   B3: Correct answer (single; for multiple select see row 8)
 *   A7: "Answer options" label, B7..: answer option texts
 *   A8: "Is answer correct?" label, B8..: "Yes" or "No" per option
 *   Photo: if a row in column A contains "Photo" or "photo url", column B is used as photo id/url (kept as-is)
 *
 * Usage: node scripts/parse-quizzes-xlsx.js [path/to/file.xlsx]
 * Default file: xlsx/Security Fundamentals.xlsx
 *
 * If a row has "Photo" or "photo url" in column A, the value in column B is
 * written as the question's "photo" field (e.g. image key or URL), unchanged.
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const QUIZZES_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'quizzes.json');

function cellValue(ws, ref) {
  const cell = ws[ref];
  if (!cell) return undefined;
  const v = cell.v;
  if (v === undefined || v === null) return undefined;
  return String(v).trim();
}

function isKahootOptionSymbol(val) {
  if (!val || typeof val !== 'string') return true;
  const s = val.trim();
  if (s.length === 0) return true;
  if (s.length === 1) return !/[a-zA-Z0-9]/.test(s);
  const symbolOnly = /^[\u25B2\u25C6\u25CF\u2713\u2714\u2716\u2718\s]+$/u;
  return symbolOnly.test(s) || s.length <= 2 && !/[a-zA-Z0-9]/.test(s);
}

function isQuizSheetName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return /^\d+\s+(True or False|Quiz|Multiple-?select(?:\s+Quiz)?|Multiple choice(?:\s+Quiz)?)/i.test(trimmed);
}

function parseSheet(ws, sheetName) {
  const questionText = cellValue(ws, 'B2');
  if (!questionText) return null;

  const typeLabel = cellValue(ws, 'A2') || '';
  const isMultipleSelect = /Multiple-?select|Multiple choice/i.test(typeLabel);

  let answers = [];
  let correctFlags = [];
  for (const answersRow of [7, 8]) {
    const correctRow = answersRow + 1;
    answers = [];
    correctFlags = [];
    let foundAny = false;
    for (let col = 1; col <= 20; col++) {
      const colLetter = XLSX.utils.encode_col(col);
      const answer = cellValue(ws, `${colLetter}${answersRow}`);
      const isCorrect = cellValue(ws, `${colLetter}${correctRow}`);
      if (answer === undefined || answer === '') {
        if (foundAny) break;
        continue;
      }
      if (isKahootOptionSymbol(answer)) continue;
      foundAny = true;
      answers.push(answer);
      correctFlags.push(/yes|✔|✓|√/i.test(isCorrect || ''));
    }
    if (answers.length > 0) break;
  }

  if (answers.length === 0) return null;

  let correctAnswer;
  if (isMultipleSelect) {
    correctAnswer = answers.filter((_, i) => correctFlags[i]);
    if (correctAnswer.length === 0) {
      const fromB3 = cellValue(ws, 'B3');
      if (fromB3) correctAnswer = [fromB3];
      else correctAnswer = [];
    }
  } else {
    const singleCorrect = cellValue(ws, 'B3');
    if (singleCorrect && answers.includes(singleCorrect)) {
      correctAnswer = singleCorrect;
    } else {
      const firstCorrectIndex = correctFlags.findIndex(Boolean);
      correctAnswer = firstCorrectIndex >= 0 ? answers[firstCorrectIndex] : (singleCorrect || answers[0]);
    }
  }

  let photo;
  for (let row = 1; row <= 25; row++) {
    const aVal = cellValue(ws, `A${row}`);
    if (aVal && /photo|photo\s*url/i.test(aVal)) {
      const bVal = cellValue(ws, `B${row}`);
      if (bVal !== undefined && bVal !== '') {
        photo = bVal;
        break;
      }
    }
  }

  const q = {
    question: questionText,
    answers,
    correctAnswer,
  };
  if (photo !== undefined) q.photo = photo;
  return q;
}

function run(xlsxPath) {
  const resolvedPath = path.isAbsolute(xlsxPath)
    ? xlsxPath
    : path.join(__dirname, '..', xlsxPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error('File not found:', resolvedPath);
    process.exit(1);
  }

  const workbook = XLSX.readFile(resolvedPath);
  const sheetNames = workbook.SheetNames;

  const quizTitle = path.basename(resolvedPath, '.xlsx');
  const questions = [];

  for (const name of sheetNames) {
    if (!isQuizSheetName(name)) continue;
    const ws = workbook.Sheets[name];
    if (!ws) continue;

    const q = parseSheet(ws, name);
    if (q) questions.push(q);
  }

  if (questions.length === 0) {
    console.log('No quiz questions found in', resolvedPath);
    return;
  }

  let quizzes = [];
  try {
    const raw = fs.readFileSync(QUIZZES_JSON_PATH, 'utf8');
    quizzes = JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read existing quizzes.json, starting fresh:', e.message);
  }

  if (!Array.isArray(quizzes)) quizzes = [];

  const existing = quizzes.find((q) => q.title === quizTitle);
  if (existing) {
    const oldQuestions = existing.questions || [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].photo === undefined && oldQuestions[i] && oldQuestions[i].photo) {
        questions[i].photo = oldQuestions[i].photo;
      } else if (questions[i].photo === undefined) {
        questions[i].photo = `q${existing.id}q${i + 1}`;
      }
    }
    existing.questions = questions;
    console.log('Updated quiz "%s" with %d questions.', quizTitle, questions.length);
  } else {
    const nextId =
      quizzes.length > 0
        ? Math.max(...quizzes.map((q) => q.id || 0), 0) + 1
        : 1;
    questions.forEach((q, i) => {
      if (q.photo === undefined) q.photo = `q${nextId}q${i + 1}`;
    });
    quizzes.push({ id: nextId, title: quizTitle, questions });
    console.log('Added new quiz "%s" with %d questions.', quizTitle, questions.length);
  }

  fs.writeFileSync(
    QUIZZES_JSON_PATH,
    JSON.stringify(quizzes, null, 2) + '\n',
    'utf8'
  );
  console.log('Wrote', QUIZZES_JSON_PATH);
}

const xlsxPath = process.argv[2];
run(xlsxPath);
