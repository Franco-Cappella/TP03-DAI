class DateTimeHelper {

isDate = (value) => {
    if (!(value instanceof Date)) return false
    else return !isNaN(value.getTime())
}

getOnlyDate = (value) => {
  if(isDate(value)){
    value.setHours(0, 0, 0, 0)
    return value
  }
}

getEdadActual = (fechaNacimiento) => {
    if (isDate(fechaNacimiento)) {
        let hoy = new Date()
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let difMes = hoy.getMonth() - fechaNacimiento.getMonth()
        if (difMes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--
        }
        return edad
    } else return null  

}

getDiasHastaMiCumple = (fechaNacimiento) => {
    if (isDate(fechaNacimiento)) {
        let hoy = new Date()
        let proximoCumple = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate())
        if (proximoCumple < hoy) {  
            proximoCumple.setFullYear(proximoCumple.getFullYear() + 1)
        }
        let difTiempo = proximoCumple - hoy
        let difDias = Math.ceil(difTiempo / (1000 * 60 * 60 * 24))
        return difDias
    } else return null
}

getDiaTexto = (fecha) => {
    if (isDate(fecha)) {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        return diasSemana[fecha.getDay()]
    } else return null

}
}

export default new DateTimeHelper()