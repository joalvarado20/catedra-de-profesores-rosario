import React from 'react';

const PersonCard = ({ person }) => {
    return (
        <div className="col-12 col-md-6 col-lg-6 mb-1">
            <div className="card">
                <div className="row">
                    <div className="col-12 col-md-7 col-lg-7 card-equipo__body">
                        <p>Nombres: {person.NOMBRES}</p>
                        <p>Correo: {person.CORREO_PERSONAL}</p>
                        <p>Área: {person.AREA}</p>
                        <p>Departamento: {person.DEPARTAMENTO}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonCard;
