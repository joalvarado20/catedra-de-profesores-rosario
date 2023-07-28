import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import SearchBar from './SearchBar';
import PersonCard from './PersonCard';

const ExcelToJsonConverter = () => {
    // Estados del componente
    const [jsonData, setJsonData] = useState(null); // Estado para almacenar los datos del archivo Excel
    const [filteredData, setFilteredData] = useState(null); // Estado para almacenar los datos filtrados por búsqueda
    const [searchText, setSearchText] = useState(''); // Estado para almacenar el texto de búsqueda
    const [isLoading, setIsLoading] = useState(true); // Estado para mostrar un mensaje de carga mientras se obtienen los datos

    // Efecto para cargar los datos desde la URL al montar el componente
    useEffect(() => {
        const fetchExcelData = async () => {
            const url = 'https://urosario.edu.co/sites/default/files/2023-07/Reporte-24-de-julio.xlsx';

            try {
                // Realizamos la petición para obtener el archivo Excel
                const response = await fetch(url);
                const data = await response.arrayBuffer();
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);

                // Almacenamos los datos en los estados correspondientes
                setJsonData(json);
                setFilteredData(json); // Al cargar el archivo, mostramos todos los datos sin filtrar
                setIsLoading(false);
            } catch (error) {
                console.error('Error al cargar el archivo Excel: ', error);
                setIsLoading(false);
            }
        };

        fetchExcelData();
    }, []);

    // Función para filtrar los datos en función del texto de búsqueda
    const handleSearch = () => {
        const filteredData = jsonData.filter((item) => {
            // Comprobamos si alguna propiedad del objeto contiene el texto de búsqueda
            return Object.values(item).some((value) => {
                if (value && typeof value === 'string') {
                    return value.toLowerCase().includes(searchText.toLowerCase());
                }
                return false;
            });
        });

        setFilteredData(filteredData); // Actualizamos el estado con los datos filtrados
    };

    // Función para limpiar el filtro y mostrar todos los datos nuevamente
    const handleClearSearch = () => {
        setFilteredData(jsonData); // Al limpiar la búsqueda, volvemos a mostrar todos los datos sin filtrar
        setSearchText('');
    };

    // Variable que determina qué datos se muestran, filtrados o no, según el texto de búsqueda
    const dataToDisplay = searchText !== '' ? filteredData : jsonData;

    return (
        <div>
            {isLoading ? (
                <p>Cargando datos...</p>
            ) : (
                <>
                    <SearchBar
                        searchText={searchText}
                        onSearchTextChange={setSearchText}
                        onSearch={handleSearch}
                        onClearSearch={handleClearSearch}
                    />
                    {/* Renderizamos los elementos individuales */}
                    {dataToDisplay ? dataToDisplay.map((item, index) => <PersonCard key={index} person={item} />) : null}
                </>
            )}
        </div>
    );
};

export default ExcelToJsonConverter;
