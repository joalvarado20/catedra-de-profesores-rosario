import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import SearchBar from './SearchBar';
import PersonCard from './PersonCard';
import ReactPaginate from 'react-paginate';

const ExcelToJsonConverter = () => {
    // Estados del componente
    const [jsonData, setJsonData] = useState(null); // Estado para almacenar los datos del archivo Excel
    const [filteredData, setFilteredData] = useState(null); // Estado para almacenar los datos filtrados por búsqueda
    const [searchText, setSearchText] = useState(''); // Estado para almacenar el texto de búsqueda
    const [isLoading, setIsLoading] = useState(true); // Estado para mostrar un mensaje de carga mientras se obtienen los datos
    const [currentPage, setCurrentPage] = useState(1); // Estado para mantener el número de página actual
    const itemsPerPage = 5; // Define cuántos elementos mostrar por página.

    // Efecto para cargar los datos desde la URL al montar el componente
    useEffect(() => {
        fetchExcelData();
    }, []); // Usamos el estado searchText directamente aquí

    useEffect(() => {
        handleSearch(); // Filtrar cada vez que cambie `searchText`
    }, [searchText]); // Dependencia del estado searchText



    // Función para obtener los datos del archivo Excel desde la URL
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

            // Filtrado de datos basado en la ruta URL y condiciones específicas
            const departmentFromURL = getDepartmentFromURL(window.location.href);
            const arrObject = departmentFromURL ? json.filter(item => item.DEPARTAMENTO === departmentFromURL) : [];

            setJsonData(arrObject);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al cargar el archivo Excel: ', error);
            setIsLoading(false);
        }
    };

    // Función para obtener el departamento desde la URL
    const getDepartmentFromURL = (url) => {
        if (url.includes("escuela-de-medicina-y-ciencias-de-la-salud")) {
            return "ESC MEDICINA Y CIENCIAS SALUD";
        } else if (url.includes("escuela-de-administracion")) {
            return "ESCUELA DE ADMINISTRACIÓN";
        } else if (url.includes("facultad-de-jurisprudencia")) {
            return "FACULTAD JURISPRUDENCIA";
        } else if (url.includes("facultad-de-ciencias-naturales")) {
            return "FACULTAD DE CIENCIAS NATURALES";
        } else if (url.includes("facultad-de-estudios-internacionales-politicos-y-urbanos")) {
            return "FAC ESTUDIOS INTLES POLÍTICOS";
        } else if (url.includes("escuela-de-ingenieria-ciencia-y-tecnologia")) {
            return "ESC INGENIERÍA, CIENCIA Y TECN";
        } else if (url.includes("escuela-de-ciencias-humanas")) {
            return "ESCUELA DE CIENCIAS HUMANAS";
        } else if (url.includes("prueba-consumo-excel")) {  // facultad-de-economia
            return "FACULTAD ECONOMÍA";
        }
        return null;
    };

    // Función para filtrar los datos en función del texto de búsqueda
    const handleSearch = () => {
        const filteredData = jsonData?.filter(item => {
            return Object.values(item).some(value => {
                if (value && typeof value === 'string') {
                    return value.toLowerCase().includes(searchText.toLowerCase());
                }
                return false;
            });
        });
        setFilteredData(filteredData || []);
        setCurrentPage(1);
    };

    // Función para limpiar el filtro y mostrar todos los datos nuevamente
    const handleClearSearch = () => {
        setFilteredData(null); // Al limpiar la búsqueda, eliminamos el filtro de búsqueda
        setSearchText('');
        setCurrentPage(1); // Reseteamos la página actual a 1 después de limpiar la búsqueda
    };

    // Variable que determina qué datos se muestran, filtrados o no, según el texto de búsqueda
    const dataToDisplay = searchText !== '' ? (filteredData || []) : (jsonData || []);

    // Calcula los índices del primer y último elemento que se mostrarán en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataToDisplay ? dataToDisplay.slice(indexOfFirstItem, indexOfLastItem) : [];
    // Calcula la cantidad total de páginas

    const totalPages = Math.ceil((dataToDisplay ? dataToDisplay.length : 0) / itemsPerPage);

    // Cambiar de página
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    return (
        <div>
            {isLoading ? (
                <p>Cargando datos...</p>
            ) : (
                <>
                    {/* Renderizamos el componente de la barra de búsqueda */}
                    <div className="container mb-1">
                        <SearchBar
                            searchText={searchText}
                            onSearchTextChange={setSearchText}
                            onSearch={handleSearch}
                            onClearSearch={handleClearSearch}
                        />
                    </div>
                    {/* Renderizamos los elementos individuales */}
                    <div className="container ">
                        <div className="row">
                            <RenderItems currentItems={currentItems} />
                        </div>
                    </div>
                    {/* Renderiza los botones de paginación */}
                    <ReactPaginate
                        previousLabel={'Anterior'}
                        nextLabel={'Siguiente'}
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        // estilos del paginador
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                    />
                </>
            )}
        </div>
    );
};

// Componente para renderizar los elementos individuales
const RenderItems = ({ currentItems }) => {
    return (
        <>
            {currentItems.map((item, index) => <PersonCard key={index} person={item} />)}
        </>
    );
};

export default ExcelToJsonConverter;
