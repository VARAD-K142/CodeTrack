import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="search-bar">
      <Search />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
