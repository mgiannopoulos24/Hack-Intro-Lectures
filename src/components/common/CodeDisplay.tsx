import React from 'react';
import { Code as BaseCode, CopyBlock, atomOneLight, dracula } from 'react-code-blocks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

/** Single source of truth: change this to switch both inline and block code themes */
export const CODE_THEME = 'light' as const;
type CodeThemeName = 'light' | 'dark';

/** Themes for inline code (react-code-blocks format) */
const INLINE_THEMES: Record<CodeThemeName, Record<string, string>> = {
  light: atomOneLight,
  dark: dracula,
};

/** Styles for code blocks (react-syntax-highlighter format) */
const BLOCK_STYLES: Record<CodeThemeName, React.ComponentProps<typeof SyntaxHighlighter>['style']> =
  {
    light: oneLight,
    dark: oneDark,
  };

const defaultTheme = INLINE_THEMES[CODE_THEME];
const codeBlockStyle = BLOCK_STYLES[CODE_THEME];

/** Single source of truth for code font (matches project body font in index.css) */
export const CODE_FONT_FAMILY = 'Ubuntu, sans-serif';

export interface InlineCodeProps {
  /** Code text to show inline */
  text: string;
  /** Language for syntax highlighting (e.g. "javascript", "python", "text") */
  language?: string;
  /** Custom theme object; defaults to theme from CODE_THEME */
  theme?: Record<string, string>;
  /** Optional class name for the wrapper */
  className?: string;
}

/**
 * Inline code with syntax highlighting. Use for short snippets in paragraphs
 * (e.g. variable names, function calls, single lines).
 */
export const InlineCode: React.FC<InlineCodeProps> = ({
  text,
  language = 'text',
  theme = defaultTheme,
  className,
}) => (
  <span className={`inline ${className ?? ''}`.trim()}>
    <BaseCode
      text={text}
      language={language}
      theme={theme}
      showLineNumbers={false}
      customStyle={{ fontFamily: CODE_FONT_FAMILY }}
      codeTagProps={{ style: { fontFamily: CODE_FONT_FAMILY } }}
    />
  </span>
);

export interface CodeBlockDisplayProps {
  /** Code text for the block */
  text: string;
  /** Language for syntax highlighting */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Starting line number */
  startingLineNumber?: number;
  /** Theme (inline only); code blocks use style from CODE_THEME */
  theme?: Record<string, string>;
  /** Highlight specific lines (e.g. "1,3" or "1-5") */
  highlight?: string;
  /** Wrap long lines */
  wrapLines?: boolean;
  /** Optional class name for the wrapper */
  className?: string;
}

/**
 * Code block with syntax highlighting (no copy button). Renders with a real <pre>
 * so newlines are preserved line-by-line like template literal strings.
 */
export const CodeBlockDisplay: React.FC<CodeBlockDisplayProps> = ({
  text,
  language = 'text',
  showLineNumbers = true,
  startingLineNumber = 1,
  theme = defaultTheme,
  highlight = '',
  wrapLines = true,
  className,
}) => (
  <div
    className={`mx-auto my-3 max-w-[500px] overflow-x-auto rounded-lg ${className ?? ''}`.trim()}
  >
    <SyntaxHighlighter
      language={language}
      style={codeBlockStyle}
      showLineNumbers={showLineNumbers}
      startingLineNumber={startingLineNumber}
      wrapLongLines={wrapLines}
      PreTag="pre"
      codeTagProps={{
        style: {
          whiteSpace: 'pre',
          fontSize: '16px',
          fontFamily: CODE_FONT_FAMILY,
        },
      }}
      customStyle={{
        margin: 0,
        fontSize: '16px',
        fontFamily: CODE_FONT_FAMILY,
      }}
    >
      {text}
    </SyntaxHighlighter>
  </div>
);

export interface CopyableCodeBlockProps extends CodeBlockDisplayProps {
  /** Called when user copies the code */
  onCopy?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Code block with a copy button. Same as CodeBlockDisplay but adds copy-to-clipboard.
 */
export const CopyableCodeBlock: React.FC<CopyableCodeBlockProps> = ({
  text,
  language = 'text',
  showLineNumbers = true,
  startingLineNumber = 1,
  theme = defaultTheme,
  highlight = '',
  wrapLines = true,
  onCopy,
  className,
}) => {
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    void navigator.clipboard.writeText(text);
    onCopy?.(e);
  };
  return (
    <div
      className={`relative mx-auto my-3 max-w-[500px] overflow-x-auto rounded-lg ${className ?? ''}`.trim()}
    >
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600"
        aria-label="Copy code"
      >
        Copy
      </button>
      <SyntaxHighlighter
        language={language}
        style={codeBlockStyle}
        showLineNumbers={showLineNumbers}
        startingLineNumber={startingLineNumber}
        wrapLongLines={wrapLines}
        PreTag="pre"
        codeTagProps={{
          style: {
            whiteSpace: 'pre',
            fontSize: '0.8125rem',
            fontFamily: CODE_FONT_FAMILY,
          },
        }}
        customStyle={{
          margin: 0,
          paddingTop: '2.25rem',
          fontSize: '0.8125rem',
          fontFamily: CODE_FONT_FAMILY,
        }}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

/**
 * Parses text with single backticks (`inline`) and triple backticks (```block```)
 * and returns a React fragment: plain text, InlineCode for `...`, CodeBlockDisplay for ```...```.
 * Triple-backtick blocks can have optional language on the first line: ```lang\ncode```
 */
export function parseBackticks(
  text: string,
  options?: { inlineLanguage?: string; blockShowLineNumbers?: boolean }
): React.ReactNode {
  const inlineLang = options?.inlineLanguage ?? 'text';
  const showLineNumbers = options?.blockShowLineNumbers ?? true;

  const parts: React.ReactNode[] = [];
  let key = 0;

  const tripleSplit = text.split('```');
  for (let i = 0; i < tripleSplit.length; i++) {
    if (i % 2 === 0) {
      // Outside a code block: may contain single backticks
      const segment = tripleSplit[i];
      const singleSplit = segment.split('`');
      for (let j = 0; j < singleSplit.length; j++) {
        if (j % 2 === 0) {
          const lines = singleSplit[j].split('\n');
          const withBreaks = lines.flatMap((line, k) =>
            k === lines.length - 1 ? [line] : [line, <br key={`br-${key}-${k}`} />]
          );
          parts.push(<React.Fragment key={key++}>{withBreaks}</React.Fragment>);
        } else {
          parts.push(<InlineCode key={key++} text={singleSplit[j]} language={inlineLang} />);
        }
      }
    } else {
      // Code block content: first line = optional language, rest = code
      const blockBody = tripleSplit[i];
      const firstNewline = blockBody.indexOf('\n');
      let language = 'text';
      let code = blockBody;
      if (firstNewline >= 0) {
        const firstLine = blockBody.slice(0, firstNewline).trim();
        if (firstLine.length > 0 && /^[\w+#-]+$/.test(firstLine)) {
          language = firstLine;
          code = blockBody.slice(firstNewline + 1);
        }
      }
      code = code.trimEnd();
      parts.push(
        <CodeBlockDisplay
          key={key++}
          text={code}
          language={language}
          showLineNumbers={showLineNumbers}
          wrapLines
        />
      );
    }
  }

  return <>{parts}</>;
}

// Re-export for custom use
export { defaultTheme, codeBlockStyle };
