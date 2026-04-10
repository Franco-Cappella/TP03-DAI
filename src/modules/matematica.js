/* Este es el módulo "matematicas" */
const PI = 3.14;
function sumar(x, y) {
return parseInt(x) + parseInt(y)

}
const multiplicar = (a, b) => {
return parseInt(a)*parseInt(b)
};
function restar(x, y) {
return parseInt(x)-parseInt(y)
}
const dividir = (a, b) => {
return parseInt(a)/parseInt(b)
};
// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export {PI, sumar, multiplicar, dividir, restar};
