import { useState } from 'react';

function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

interface CopyResult {
    (text: string): Promise<boolean>;
}

const copy: CopyResult = async (text) => {
    if (navigator?.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            handleSuccess(text);
            return true;
        } catch (err) {
            console.error('Clipboard API copy failed, trying fallback...', err);
            return fallbackCopy(text);
        }
    } else {
        return fallbackCopy(text);
    }
};

interface FallbackCopy {
    (text: string): boolean;
}

const fallbackCopy: FallbackCopy = (text) => {
    try {
        const textarea: HTMLTextAreaElement = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '2em';
        textarea.style.height = '2em';
        textarea.style.padding = '0';
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const successful: boolean = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
            handleSuccess(text);
            return true;
        } else {
            throw new Error('Fallback copy failed');
        }
    } catch (err) {
        console.error('Fallback copy to clipboard failed.', err);
        setIsCopied(false);
        return false;
    }
};

interface HandleSuccess {
    (text: string): void;
}

const handleSuccess: HandleSuccess = (text) => {
    setCopiedText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
};

  return { copy, copiedText, isCopied };
}

export default useCopyToClipboard;
