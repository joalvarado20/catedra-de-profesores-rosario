import React from 'react';

const ErrorMessage = () => (
    <div className="container">
        <div className='row mt-5'>
            <div className="row d-flex justify-content-center errorBusqueda">
                <div className="col-sm-6 text-center">
                    <img src="https://urosario.edu.co/sites/default/files/2023-05/icono-lupa.jpg" alt="No hay coincidencias en la búsqueda del profesor" />
                    <br />
                    <h5>
                        <strong>
                            Lo sentimos, no pudimos encontrar coincidencias
                        </strong>
                        <br />
                        <small>
                            por favor intente nuevamente con otros términos
                        </small>
                    </h5>
                </div>
            </div>
        </div>
    </div>
);

export default ErrorMessage;
