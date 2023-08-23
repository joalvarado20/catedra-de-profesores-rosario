
    // Función para obtener el departamento desde la URL
    export  const getDepartmentFromURL = (url) => {
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