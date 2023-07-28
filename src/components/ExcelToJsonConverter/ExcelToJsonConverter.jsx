import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExcelToJsonConverter = () => {
    // Estado para almacenar los datos del archivo Excel
    const [jsonData, setJsonData] = useState(null);

    // Estado para almacenar los datos filtrados por búsqueda
    const [filteredData, setFilteredData] = useState(null);

    // Estado para almacenar el texto de búsqueda
    const [searchText, setSearchText] = useState('');

    // Estado para mostrar un mensaje de carga mientras se obtienen los datos
    const [isLoading, setIsLoading] = useState(true);

    // Efecto para cargar los datos desde la URL al montar el componente
    useEffect(() => {
        const fetchExcelData = async () => {
            const url = 'https://urosario.edu.co/sites/default/files/2023-07/Reporte-24-de-julio.xlsx';

            try {
                const response = await fetch(url);
                const data = await response.arrayBuffer();
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);

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
                if (value && typeof value === "string") {
                    return value.toLowerCase().includes(searchText.toLowerCase());
                }
                return false;
            });
        });

        setFilteredData(filteredData);
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
                    <div>
                        <input
                            type="text"
                            value={searchText}
                            placeholder="Buscar..."
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button onClick={handleSearch}>Buscar</button>
                        <button onClick={handleClearSearch}>Limpiar</button>
                    </div>

                    {/* Renderizado condicional de los datos */}
                    {dataToDisplay ? dataToDisplay.map((item, index) => (
                        <div className="col-12 col-md-6 col-lg-6 mb-1" key={index}>
                            <div className="card">
                                <div className="row">
                                    <div className="col-12 col-md-7 col-lg-7 card-equipo__body">
                                        <p>Nombres: {item.NOMBRES}</p>
                                        <p>Correo: {item.CORREO_PERSONAL}</p>
                                        <p>Área: {item.AREA}</p>
                                        <p>Departamento: {item.DEPARTAMENTO}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </>
            )}
        </div>
    );
};

export default ExcelToJsonConverter;
