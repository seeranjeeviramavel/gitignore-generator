import React from "react";
import { Copy, Check, Download } from "lucide-react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { useDownloadGitignore } from "../hooks/useDownloadGitignore";

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const { copy, isCopied } = useCopyToClipboard();
  const downloadGitignore = useDownloadGitignore();

  const handleCopy = () => {
    copy(code);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-slate-800 text-white">
        <h3 className="text-sm font-medium">Generated .gitignore</h3>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => downloadGitignore(code)}
            className="flex items-center space-x-1 text-sm px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-sm px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative">
        <pre className="p-4 bg-slate-900 text-slate-200 overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>

        {isCopied && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-green-600 text-white px-4 py-2 rounded-md animate-fade-out">
              Copied to clipboard!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
