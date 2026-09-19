import { useEffect, useState } from 'react';

interface FilterBarProps {
  highRiskOnly: boolean;
  onHighRiskChange: (value: boolean) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DEBOUNCE_MS = 300;

function FilterBar({ highRiskOnly, onHighRiskChange, searchTerm, onSearchChange }: FilterBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const handle = setTimeout(() => {
      onSearchChange(inputValue);
    }, DEBOUNCE_MS);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search by return ID..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <label className="high-risk-toggle">
        <input
          type="checkbox"
          checked={highRiskOnly}
          onChange={(e) => onHighRiskChange(e.target.checked)}
        />
        High risk only
      </label>
    </div>
  );
}

export default FilterBar;
