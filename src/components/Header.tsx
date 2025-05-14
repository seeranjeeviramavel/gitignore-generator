import React from "react";
import { GitBranch, Github } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GitBranch className="h-8 w-8 mr-3" />
            <h1 className="text-2xl md:text-xl font-bold">
              GitIgnore Generator
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/seeranjeeviramavel/gitignore-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-white/90 hover:text-white transition-colors duration-200"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
