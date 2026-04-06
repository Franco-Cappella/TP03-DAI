export default class  Alumno
 {
    constructor(username, dni, edad){
        this.username = username
        this.dni = dni
        this.edad = edad
    }
    toString(){
    return `"Tu nombre es ${this.username}, tu DNI es ${this.dni}, y tu edad es ${this.edad} "`
  }
    
}