import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { TechCard } from "./TechCard";
import useDebounce from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { LoadingIndicator } from "./LoadingIndicator";
import { TechItem } from "../types";

interface TechnologiesProps {
  selectedTechs: string[];
  onTechSelect: (tech: string) => void;
  onClearSelections: () => void;
}

const CARD_WIDTH = 250;
const CARD_HEIGHT = 110;
const GRID_GAP = 8;

const getTechData = async () => {
  try {
    const response = await fetch("/techdata.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tech data:", error);
    return [];
  }
};

export const Technologies: React.FC<TechnologiesProps> = ({
  selectedTechs,
  onTechSelect,
  onClearSelections,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

const { data: techData = [], isLoading } = useQuery<TechItem[]>({
  queryKey: ["techdata"],
  queryFn: getTechData,
});

  const categories = useMemo(() => {
    const allCategories = techData.map((tech) => tech.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, [techData]);

  const filteredTechs = useMemo(() => {
    return techData.filter((tech) => {
      const matchesSearch = tech.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesCategory =
        !activeCategory ||
        activeCategory === "All" ||
        tech.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, activeCategory, techData]);

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: { items: typeof techData; itemsPerRow: number };
  }) => {
    const index = rowIndex * data.itemsPerRow + columnIndex;
    if (index >= data.items.length) return null;

    const tech = data.items[index];
    return (
      <div style={{ ...style, padding: GRID_GAP / 2 }}>
        <TechCard
          tech={tech}
          isSelected={selectedTechs.includes(tech.id)}
          onSelect={() => onTechSelect(tech.id)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {selectedTechs.length > 0 && (
            <button
              onClick={onClearSelections}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-150"
            >
              Clear ({selectedTechs.length})
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category === "All" ? null : category)
                }
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-150 ${
                  (category === "All" && !activeCategory) ||
                  category === activeCategory
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredTechs.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No technologies found. Try a different search term.
            </div>
          ) : (
            <div style={{ height: 600 }}>
              <AutoSizer>
                {({ width, height }) => {
                  const itemsPerRow = Math.max(
                    1,
                    Math.floor(width / (CARD_WIDTH + GRID_GAP))
                  );
                  const rowCount = Math.ceil(filteredTechs.length / itemsPerRow);

                  return (
                    <Grid
                      columnCount={itemsPerRow}
                      columnWidth={CARD_WIDTH + GRID_GAP}
                      height={height}
                      rowCount={rowCount}
                      rowHeight={CARD_HEIGHT + GRID_GAP}
                      width={width}
                      itemData={{ items: filteredTechs, itemsPerRow }}
                    >
                      {Cell}
                    </Grid>
                  );
                }}
              </AutoSizer>
            </div>
          )}
        </>
      )}
    </div>
  );
};
