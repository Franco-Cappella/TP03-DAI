function armarEnvelopeOMDB(data) {
    const envelopeDefault = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    if (!data) {
        return envelopeDefault;
    }
    if (Array.isArray(data)) {
        return {
            respuesta: data.length > 0,
            cantidadTotal: data.length,
            datos: data // Pasamos el array directamente
        };
    }
    if (data.Search) {
        return {
            respuesta: data.Response === 'True',
            cantidadTotal: parseInt(data.totalResults, 10) || data.Search.length,
            datos: data.Search
        };
    }


    if (data.Title && data.Response === 'True') {
        return {
            respuesta: true,
            cantidadTotal: 1,
            datos: data
        };
    }


    return envelopeDefault;
}
export { armarEnvelopeOMDB }