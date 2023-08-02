import React, { } from "react";
import './App.css';
import ExcelToJsonConverter from './components/CatedraProfesores/ExcelToJsonConverter';

const App = () => {

    return (
        <>
            <div className="container ">
                <div className="row">
                    <ExcelToJsonConverter />
                </div>
            </div>
        </>
    );
};

export default App;
