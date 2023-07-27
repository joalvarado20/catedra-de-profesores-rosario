import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExcelToJsonConverter = () => {
    const [jsonData, setJsonData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
                setFilteredData(json);
                setIsLoading(false);

            } catch (error) {
                console.error('Error al cargar el archivo Excel: ', error);
                setIsLoading(false);
            }
        };

        fetchExcelData();
    }, []);

    const handleSearch = () => {
        const filteredData = jsonData.filter((arr) =>
            arr.some((item) => {
                if (item[1] && typeof item[1] === "string") {
                    return item[1].toLowerCase().includes(searchText.toLowerCase());
                }
                return false;
            })
        );
        setFilteredData(filteredData);
    };

    const handleClearSearch = () => {
        setFilteredData(jsonData);
        setSearchText('');
    };

    let dataToDisplay = filteredData || jsonData; // Utilizamos una variable local para el mapeo

    if (searchText !== '') {
        dataToDisplay = filteredData; // Si hay un valor de búsqueda, mostramos los datos filtrados
    }

    return (
        <div>
            {isLoading ? (
                <p>Cargando datos...</p>
            ) : (
                <>
                    <input type="file" onChange={() => { }} />
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

                    {dataToDisplay ? dataToDisplay.map((arr, index) => (
                        <div className="col-12 col-md-6 col-lg-6 mb-1" key={index}>
                            <div className="card">
                                <div className="row">
                                    <div className="col-12 col-md-7 col-lg-7 card-equipo__body">
                                        <p>Nombres: {arr.NOMBRES}</p>
                                        <p>Correo: {arr.CORREO_PERSONAL}</p>
                                        <p>Área: {arr.AREA}</p>
                                        <p>Departamento: {arr.DEPARTAMENTO}</p>
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
