import React, { useState } from 'react';
import "../../App.css";

const SearchBar = ({ searchText, onSearchTextChange, onSearch }) => {
    const [localSearchText, setLocalSearchText] = useState(searchText);

    const handleInputChange = (event) => {
        setLocalSearchText(event.target.value);
    };

    const handleSearch = () => {
        onSearchTextChange(localSearchText); // Actualiza el texto de búsqueda en el componente padre
        onSearch(); // Realiza la búsqueda con el nuevo texto
    };

    const handleClearSearch = () => {
        setLocalSearchText('');
        onSearchTextChange(''); // Actualiza el texto de búsqueda en el componente padre para limpiar los datos
        onSearch(); // Realiza la búsqueda con un string vacío para mostrar todos los datos
    };

    return (
        <form className="mb-1 container">
            <div className="row d-flex justify-content-center">
                <div className="col-sm-3">
                    <input
                        className='form-control w-100'
                        type="text"
                        value={localSearchText} // Usa el estado local en lugar del prop searchText
                        placeholder="Busqueda por nombre"
                        autoComplete="off"
                        name="nombre"
                        onChange={handleInputChange} // Usa la función de manejo de cambio del input
                    />
                </div>
                <div className="col-sm-3">
                    <button type='button' className="btn btn-outline-primary me-2" onClick={handleSearch}>Buscar</button>
                    <button type="button" className="btn btn-outline-danger" onClick={handleClearSearch}>Limpiar</button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
