class DateTimeHelper {

    isDate = (value) => {
        if (!(value instanceof Date)) return false
        else return !isNaN(value.getTime())
    }

    getOnlyDate = (value) => {
        if (this.isDate(value)) {
            value.setHours(0, 0, 0, 0)
            return value
        }
    }

    getEdadActual = (fechaNacimiento) => {
        if (this.isDate(fechaNacimiento)) {
            let hoy = new Date()
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let difMes = hoy.getMonth() - fechaNacimiento.getMonth()
            if (difMes < 0 || (difMes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--
            }
            return edad
        } else return null

    }

    getDiasHastaMiCumple = (fechaNacimiento) => {
        if (this.isDate(fechaNacimiento)) {
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

    getDiaTexto = (fecha, esAbreviado) => {
        let dia = "";
        if (this.isDate(fecha)) {
            const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
            dia = diasSemana[fecha.getDay()]
        } else return null
        if (esAbreviado) dia = dia.slice(0, 3)
        return dia
    }

    getMesTexto = (fecha, esAbreviado) => {
         let mes = "";
        if (this.isDate(fecha)) {
            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            mes = meses[fecha.getMonth()]
        } else return null
        if (esAbreviado) mes = mes.slice(0, 3)
        return mes
    }
}

export default new DateTimeHelper()