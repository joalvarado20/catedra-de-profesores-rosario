import React, {} from "react";
import './App.css';
import ExcelToJsonConverter from './components/CatedraProfesores/ExcelToJsonConverter';

const App = () => {

    return (
        <div>
            <div className="file">
                <ExcelToJsonConverter/>
            </div>
        </div>
    );
};

export default App;
