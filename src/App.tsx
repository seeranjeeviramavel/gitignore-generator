import React, { useEffect, useState } from "react";
import { CodeBlock } from "./components/CodeBlock";
import { Technologies } from "./components/Technologies";
import { Header } from "./components/Header";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { History } from "./components/History";
import { useGemini } from "./hooks/useGemini";
import { GitBranch } from "lucide-react";

interface HistoryItem {
  techs: string[];
  content: string;
  date: Date;
}

const HISTORY_KEY = "gitignore-generated-history";
function App() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const { loading, generate } = useGemini();
  const [gitignoreContent, setGitignoreContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((item: HistoryItem) => ({
        ...item,
        date: new Date(item.date),
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const handleTechSelect = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleGenerateGitignore = async () => {
    if (selectedTechs.length === 0) {
      setError("Please select at least one technology");
      return;
    }

    setError(null);
    setGitignoreContent("");

    const prompt = `I'm using a stack that includes ${selectedTechs.join(
      ", "
    )} .Please provide a .gitignore file that ignores all unnecessary files and folders related to these tools and development in general.`;

    let streamedText = "";
    const onStreamUpdate = (chunk: string) => {
      streamedText += chunk;
      setGitignoreContent(streamedText);
    };
    await generate(prompt, onStreamUpdate);
    const historyItem = {
      techs: [...selectedTechs],
      content: streamedText,
      date: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev].slice(0, 10));
  };

  const handleClearSelections = () => {
    setSelectedTechs([]);
  };

  const handleLoadFromHistory = (historyItem: {
    techs: string[];
    content: string;
  }) => {
    setSelectedTechs(historyItem.techs);
    setGitignoreContent(historyItem.content);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Select Technologies
              </h2>

              <Technologies
                selectedTechs={selectedTechs}
                onTechSelect={handleTechSelect}
                onClearSelections={handleClearSelections}
              />

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
                  {error}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
                <div>
                  <span className="text-slate-600">
                    {selectedTechs.length} technologies selected
                  </span>
                </div>
                <button
                  onClick={handleGenerateGitignore}
                  disabled={loading || selectedTechs.length === 0}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center
                    ${
                      loading || selectedTechs.length === 0
                        ? "bg-indigo-300 text-white cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }`}
                >
                  <GitBranch strokeWidth={2.5} className="h-4 w-4 mr-2" />
                  {loading ? "Generating..." : "Generate GitIgnore"} 
                </button>
              </div>
            </div>
          </div>

          {loading && <LoadingIndicator />}

          {gitignoreContent && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
              <CodeBlock code={gitignoreContent} />
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-12">
              <History history={history} onSelect={handleLoadFromHistory} />
            </div>
          )}
        </div>
      </main>

    </div>
  );
}

export default App;
