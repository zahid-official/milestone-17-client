/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { searchAddressSuggestions } from "@/utils/geo";

export default function LocationInput({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (loc: { label: string; lat: number; lon: number }) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSelected) return;

    const timeout = setTimeout(() => {
      if (inputValue.length > 2) {
        setIsLoading(true);
        searchAddressSuggestions(inputValue).then((results) => {
          setSuggestions(results);
          setShowSuggestions(true);
          setIsLoading(false);
        });
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200); // ⏱️ Debounce: now faster

    return () => clearTimeout(timeout);
  }, [inputValue, isSelected]);

  const handleSelect = (suggestion: any) => {
    setInputValue(suggestion.label);
    onSelect(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsSelected(true);
  };

  return (
    <div className="relative w-full">
      <label className="block text-white mb-1">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsSelected(false);
        }}
        className="w-full px-4 py-2 rounded bg-zinc-900 text-white border"
        placeholder="Start typing address..."
      />

      {/* suggestions */}
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <ul className="absolute z-10 w-full bg-white text-black mt-1 rounded shadow max-h-60 overflow-auto">
          {isLoading && (
            <li className="px-4 py-2 text-gray-500 italic">Loading...</li>
          )}
          {!isLoading &&
            suggestions.map((s, index) => (
              <li
                key={index}
                onClick={() => handleSelect(s)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
              >
                {s.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
