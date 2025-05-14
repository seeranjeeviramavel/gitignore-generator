import { useCallback } from "react";

export function useDownloadGitignore() {
  const downloadGitignore = useCallback((content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = ".gitignore";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return downloadGitignore;
}
