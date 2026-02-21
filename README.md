# [Hack-Intro-Lectures](https://hackintro-lectures.netlify.app/)

## Περιγραφή 

Η εφαρμογή **Hack-Intro-Lectures** είναι μια διαδικτυακή πλατφόρμα που συγκεντρώνει όλα τα υλικά για το μάθημα "Προστασία και Ασφάλεια Υπολογιστικών Συστημάτων" του Τμήματος Πληροφορικής και Τηλεπικοινωνιών (DIT). Η πλατφόρμα περιλαμβάνει:

- **Καταγραφές Μαθημάτων:** Προσβάσιμες και οργανωμένες για εύκολη αναφορά.
- **Papers:** Ακαδημαϊκά έγγραφα και αναφορές σχετικές με το μάθημα.
- **Διαφάνειες:** Σημαντικές παρουσιάσεις και σημειώσεις.
- **Kahoot Quizzes:** Διαδραστικά κουίζ για επανάληψη.

## Τεχνολογίες που χρησιμοποιήθηκαν

1. React 18
2. Vite
3. React Router Dom
4. Shadcn UI
5. Lucide React (icons)
6. Tailwind CSS
7. React Tilt
8. react-code-blocks (inline & code block syntax highlighting)
9. Vitest with React Testing Library

## Code blocks (inline & block)

Η εφαρμογή υποστηρίζει εμφάνιση κώδικα με syntax highlighting μέσω [react-code-blocks](https://github.com/rajinwonderland/react-code-blocks):

- **Inline:** `InlineCode` για σύντομα snippets μέσα σε κείμενο (π.χ. `scanf("%s", buffer)`).
- **Block:** `CodeBlockDisplay` για πολυγραμμικό κώδικα χωρίς κουμπί copy.
- **Block με copy:** `CopyableCodeBlock` για πολυγραμμικό κώδικα με κουμπί αντιγραφής.

Όλα τα components βρίσκονται στο `src/components/common/CodeDisplay.tsx`. Χρήση:

```tsx
import { InlineCode, CodeBlockDisplay, CopyableCodeBlock } from '@/components/common/CodeDisplay';

// Inline
<InlineCode text="printf(\"hello\");" language="c" />

// Block (no copy button)
<CodeBlockDisplay text={codeString} language="javascript" />

// Block with copy button
<CopyableCodeBlock text={codeString} language="python" showLineNumbers wrapLines />
```

## Γλώσσες που χρησιμοποιήθηκαν

1. HTML
2. CSS (με Tailwind)
3. TypeScript
4. JavaScript

## Εισαγωγή κουίζ από Excel

Τα κουίζ μπορούν να εισάγονται από αρχεία Excel (π.χ. εξαγωγή Kahoot) μέσω του script `scripts/parse-quizzes-xlsx.js`. Κάθε ερώτηση αντιστοιχεί σε ξεχωριστό sheet με ονόματα τύπου «1 True or False», «2 Quiz», «11 Multiple select Quiz» κ.λπ.

**Χρήση:**

```console
npm run parse-quizzes
```

ή με συγκεκριμένο αρχείο:

```console
node scripts/parse-quizzes-xlsx.js "xlsx/Security Fundamentals.xlsx"
```

Το script ενημερώνει το `src/data/quizzes.json`: αν υπάρχει ήδη κουίζ με τον ίδιο τίτλο (από κελί A1), αντικαθίστανται οι ερωτήσεις του· διαφορετικά προστίθεται νέο κουίζ. Τα πεδία `photo` (εικόνες ανά ερώτηση) διατηρούνται κατά ευρετήριο όταν ενημερώνεται υπάρχον κουίζ.

## Εγκατάσταση 
Για να εγκαταστήσετε και να τρέξετε την εφαρμογή τοπικά, ακολουθήστε τα παρακάτω βήματα:
1. Κλωνοποιήστε το αποθετήριο:
```console
git clone https://github.com/mgiannopoulos24/Hack-Intro-Lectures.git
```
2. Μεταβείτε στο φάκελο του project:
```console
cd Hack-Intro-Lectures
```
3. Εγκαταστήστε τα απαιτούμενα πακέτα:
```console
npm install
```
4. Ξεκινήστε την εφαρμογή:
```console
npm start
```

Βεβαιωθείτε ότι έχετε εγκαταστήσει το [NodeJS](https://nodejs.org/en) στον υπολογιστή σας.

## Έμπνευση

Έμπνευση ήταν η σελίδα [Quiz App](https://starlit-daffodil-2e4733.netlify.app/). Credits στην [original creator](https://github.com/matinanadali).

## Ευχαριστίες 

Θερμές ευχαριστίες αποδίδονται στον κύριο [Θανάση Αυγερινό](https://github.com/ethan42), ο οποίος παρείχε τα Kahoot Quiz.
