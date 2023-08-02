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

    return (
            <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                <div className="card-profesores-catedra bg-white p-1 mb-1" style={cardStyle}>
                    <h4 style={titleStyle}>Nombres: {person.NOMBRES}</h4>
                    <i className="fas fa-envelope" style={iconStyle}></i>{' '}
                    <a href="mailto:paola.mesa@urosario.edu.co" style={linkStyle}>
                        {person.CORREO_PERSONAL}
                    </a>
                    <br />
                    <small style={smallStyle}>{person.DEPARTAMENTO}</small>
                    <p>Área: {person.AREA}</p>
                </div>
            </div>
    );
};

export default PersonCard;
