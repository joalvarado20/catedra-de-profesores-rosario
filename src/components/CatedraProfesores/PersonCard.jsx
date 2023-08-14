import React from 'react';

const PersonCard = ({ person }) => {
    const cardStyle = {
        borderLeft: '4px solid var(--main-page-color)',
        borderRadius: '9px',
    };

    const titleStyle = {
        color: 'var(--main-page-color)',
        marginBottom: '11px',
        fontSize: '1rem',
    };

    const linkStyle = {
        color: 'var(--main-page-color)',
        fontSize: '0.9em',
    };

    const smallStyle = {
        fontSize: '0.9em',
    };

    const iconStyle = {
        color: 'var(--main-page-color)',
    };

    // funcion que tranforma en minuscula para despues generar la palabar en UpperCase
    function capitalizeFirstLetter(str) {
        if (str) {
            return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        }
        return str; // Si la cadena está vacía, devolverla sin cambios
    }


    return (
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
            <div className="card-profesores-catedra bg-white p-1 mb-1" style={cardStyle}>
                <h4 style={titleStyle}>
                    {capitalizeFirstLetter(person.EMP_APELLIDO1)}{' '}
                    {capitalizeFirstLetter(person.EMP_APELLIDO2)},{' '}
                    {capitalizeFirstLetter(person.EMP_NOMBRE)}
                </h4>
                <i className="fas fa-envelope" style={iconStyle}></i>{' '}
                <a href={`mailto:${person.CORREO_PERSONAL}`} style={linkStyle}>
                    {person.CORREO_PERSONAL.toLowerCase()}
                </a>
                <br />
                {(person.UBIC_URO && person.UBIC_URO !== 'SIN REGISTRO') ?
                    <small style={smallStyle}>
                        <i className="fas fa-map-marker-alt" style={iconStyle}></i>{' '}
                        {capitalizeFirstLetter(person.UBIC_URO)}
                    </small>
                    : null}
                <p><i className="fas fa-layer-group" style={iconStyle}></i>{' '}{person.AREA}</p>
            </div>
        </div>
    );
};

export default PersonCard;
