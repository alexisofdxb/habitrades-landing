"use client";

type ApiCodeShowcaseProps = {
  code: string;
  language?: "json" | "typescript";
};

const TS_KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "await",
  "new",
  "async",
  "return",
  "export",
  "default",
  "typeof",
]);

const TS_BUILTINS = new Set(["process", "console"]);
const TS_OBJECT_VARS = new Set(["context", "plan"]);

function highlightValue(value: string) {
  const trimmed = value.trim();

  if (/^"(?:\\.|[^"\\])*",?$/.test(trimmed)) {
    const trailing = trimmed.endsWith(",") ? "," : "";
    const str = trailing ? trimmed.slice(0, -1) : trimmed;
    return (
      <>
        <span className="text-[#7ee787]">{str}</span>
        {trailing ? <span className="text-[#e6edf3]">{trailing}</span> : null}
      </>
    );
  }

  if (/^\d+,?$/.test(trimmed)) {
    const trailing = trimmed.endsWith(",") ? "," : "";
    const num = trailing ? trimmed.slice(0, -1) : trimmed;
    return (
      <>
        <span className="text-[#ffa657]">{num}</span>
        {trailing ? <span className="text-[#e6edf3]">{trailing}</span> : null}
      </>
    );
  }

  return <span className="text-[#e6edf3]">{value}</span>;
}

function getTypeScriptIdentifierClass(
  token: string,
  previousToken: string | null,
) {
  if (TS_KEYWORDS.has(token)) {
    return "text-[#c586c0]";
  }

  if (/^[A-Z][A-Za-z0-9_$]*$/.test(token)) {
    return "text-[#4ec9b0]";
  }

  if (TS_BUILTINS.has(token) || TS_OBJECT_VARS.has(token)) {
    return "text-[#79c0ff]";
  }

  if (previousToken === "." && /^[A-Za-z_$][\w$]*$/.test(token)) {
    return "text-[#e6edf3]";
  }

  return "text-[#e6edf3]";
}

function highlightTypeScriptExpression(expression: string, keyPrefix: string) {
  const tokens = expression.match(
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b[A-Za-z_$][\w$]*\b|\d+|[{}()[\].,:=;]|\s+)/g,
  );

  if (!tokens) {
    return <span className="text-[#e6edf3]">{expression}</span>;
  }

  let previousMeaningfulToken: string | null = null;

  return tokens.map((token, index) => {
    if (!token) return null;

    if (/^"(?:\\.|[^"\\])*"$/.test(token) || /^'(?:\\.|[^'\\])*'$/.test(token)) {
      previousMeaningfulToken = null;
      return (
        <span key={`${keyPrefix}-${index}`} className="text-[#7ee787]">
          {token}
        </span>
      );
    }

    if (/^\d+$/.test(token)) {
      previousMeaningfulToken = token;
      return (
        <span key={`${keyPrefix}-${index}`} className="text-[#b5cea8]">
          {token}
        </span>
      );
    }

    if (/^[A-Za-z_$][\w$]*$/.test(token)) {
      const className = getTypeScriptIdentifierClass(token, previousMeaningfulToken);
      previousMeaningfulToken = token;
      return (
        <span key={`${keyPrefix}-${index}`} className={className}>
          {token}
        </span>
      );
    }

    if (token.trim()) {
      previousMeaningfulToken = null;
    }

    return (
      <span
        key={`${keyPrefix}-${index}`}
        className="text-[#e6edf3]/80"
      >
        {token}
      </span>
    );
  });
}

function TypeScriptLine({ line }: { line: string }) {
  if (line.length === 0) {
    return <br />;
  }

  const objectKeyMatch = line.match(/^(\s*)([A-Za-z_$][\w$]*)(\s*:\s*)(.*)$/);
  if (objectKeyMatch) {
    const [, indent, key, colon, value] = objectKeyMatch;
    return (
      <div>
        <span className="text-[#e6edf3]">{indent}</span>
        <span className="text-[#e6edf3]">{key}</span>
        <span className="text-[#e6edf3]/55">{colon}</span>
        {highlightTypeScriptExpression(value, `obj-${key}`)}
      </div>
    );
  }

  return <div>{highlightTypeScriptExpression(line, "line")}</div>;
}

function JsonLine({ line }: { line: string }) {
  if (line.length === 0) {
    return <br />;
  }

  const keyMatch = line.match(/^(\s*)("(?:\\.|[^"\\])*")(\s*:\s*)(.*)$/);
  if (keyMatch) {
    const [, indent, key, colon, value] = keyMatch;
    return (
      <div>
        <span className="text-[#e6edf3]">{indent}</span>
        <span className="text-[#79c0ff]">{key}</span>
        <span className="text-[#e6edf3]/50">{colon}</span>
        {highlightValue(value)}
      </div>
    );
  }

  const arrayStringMatch = line.match(/^(\s*)("(?:\\.|[^"\\])*")(,?)$/);
  if (arrayStringMatch) {
    const [, indent, str, trailing] = arrayStringMatch;
    return (
      <div>
        <span className="text-[#e6edf3]">{indent}</span>
        <span className="text-[#7ee787]">{str}</span>
        {trailing ? <span className="text-[#e6edf3]">{trailing}</span> : null}
      </div>
    );
  }

  return (
    <div>
      {line.split(/("[^"]*"|\d+|[{}\[\],])/g).map((part, index) => {
        if (!part) return null;
        if (/^"[^"]*"$/.test(part)) {
          return (
            <span key={index} className="text-[#7ee787]">
              {part}
            </span>
          );
        }
        if (/^\d+$/.test(part)) {
          return (
            <span key={index} className="text-[#ffa657]">
              {part}
            </span>
          );
        }
        return (
          <span key={index} className="text-[#e6edf3]">
            {part}
          </span>
        );
      })}
    </div>
  );
}

function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: "json" | "typescript";
}) {
  const Line = language === "typescript" ? TypeScriptLine : JsonLine;

  return (
    <pre className="w-full overflow-x-auto font-mono text-[12px] leading-[1.6] sm:text-[13px] min-[1200px]:text-[14px]">
      {code.split("\n").map((line, index) => (
        <Line key={`${index}-${line}`} line={line} />
      ))}
    </pre>
  );
}

export default function ApiCodeShowcase({
  code,
  language = "json",
}: ApiCodeShowcaseProps) {
  return (
    <div className="h-full min-h-0 px-5 py-5 sm:px-7 sm:py-6 min-[1200px]:px-9 min-[1200px]:py-7">
      <CodeBlock code={code} language={language} />
    </div>
  );
}