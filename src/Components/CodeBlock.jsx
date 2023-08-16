import { useState } from "react";
import Clipboard from "clipboard";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css"; // Use the GitHub theme
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

const CodeBlock = ({ code }) => {
  const highlightedCode = hljs.highlightAuto(code).value;

  return (
    <div className="pl-10 pr-20 pt-2 pb-2">
      <pre className="bg-[#E5E7EB] rounded-2xl">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
