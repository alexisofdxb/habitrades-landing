"use client";

type ApiCodeShowcaseProps = {
  code: string;
};

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

function JsonCode({ code }: { code: string }) {
  return (
    <pre className="w-full overflow-x-auto font-mono text-[10px] leading-[1.55] sm:text-[11px] min-[1200px]:text-[12px]">
      {code.split("\n").map((line, index) => (
        <JsonLine key={`${index}-${line}`} line={line} />
      ))}
    </pre>
  );
}

export default function ApiCodeShowcase({ code }: ApiCodeShowcaseProps) {
  return (
    <div className="h-full px-5 py-5 sm:px-8 sm:py-6 min-[1200px]:px-10 min-[1200px]:py-7">
      <JsonCode code={code} />
    </div>
  );
}