
function getIntegerOrDefault(value, defaultValue) {
    let valorParseado = parseInt(value)
    if (isNaN(valorParseado)) {
        return defaultValue;
    } else return valorParseado
}
function getStringOrDefault(value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue
    } else return value.toString()
}
function getDateOrDefault(value, defaultValue){
   let fecha = new Date(value);

    if (isNaN(fecha.getTime())) {
        return defaultValue;
    } else {
        return fecha;
    }
}