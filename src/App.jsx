import React, { useState } from "react";
import './App.css';
import ExcelToJsonConverter from './components/ExcelToJsonConverter/ExcelToJsonConverter';

const App = () => {
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (filteredData) => {
        // Actualiza el estado con los datos filtrados
        setFilteredData(filteredData);
    };

    return (
        <div>
            <div className="file">
                <ExcelToJsonConverter onDataSelected={handleFilter} />
            </div>
        </div>
    );
};

export default App;
