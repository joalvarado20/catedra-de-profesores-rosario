import React from 'react';

const SearchBar = ({ searchText, onSearchTextChange, onSearch, onClearSearch }) => {
    return (
        <div>
            <input
                type="text"
                value={searchText}
                placeholder="Buscar..."
                onChange={(e) => onSearchTextChange(e.target.value)}
            />
            <button onClick={onSearch}>Buscar</button>
            <button onClick={onClearSearch}>Limpiar</button>
        </div>
    );
};

export default SearchBar;
