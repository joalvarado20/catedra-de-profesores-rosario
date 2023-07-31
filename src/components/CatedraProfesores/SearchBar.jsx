import React from 'react';
import "../../App.css";

const SearchBar = ({ searchText, onSearchTextChange, onSearch, onClearSearch }) => {
    return (
        <form className="mb-1 container">
            <div className="row d-flex justify-content-center">
                <div class="col-sm-3">
                    <input
                        className='form-control w-100'
                        type="text"
                        value={searchText}
                        placeholder="Busqueda por nombre"
                        autocomplete="off"
                        name="nombre"
                        onChange={(e) => onSearchTextChange(e.target.value)}
                    />
                </div>
                <div class="col-sm-3">
                    <button type='button' className="btn btn-outline-primary me-2" onClick={onSearch}>Buscar</button>
                    <button type="button" className="btn btn-outline-danger" onClick={onClearSearch}>Limpiar</button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;