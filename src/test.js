import express from "express";
import cors from "cors";
import { multiplicar, PI, sumar, dividir, restar } from '../src/modules/matematica.js';
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js"
import { armarEnvelopeOMDB } from "./modules/envelope.js"
import Alumno from "./models/alumno.js";
import {getIntegerOrDefault, getStringOrDefault, getDateOrDefault, getBoolOrDefault, isEmail } from './modules/validaciones-helper.js'
let alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

const app = express()
const port = 3000
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
app.get('/', (req, res) => {
    // EndPoint "/", verbo GET
    res.send('YA ESTOY RESPONDIENDO!');
})

app.get('/saludar/:nombre', (req, res) => {
    nombre = getStringOrDefault(req.params.nombre, 'Anonimo')
    res.send('Hola ' + nombre + ', espero que tengas un hermoso dia')
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    let ano = getIntegerOrDefault(req.query.ano, 0)
    let mes = getIntegerOrDefault(req.query.mes, 0)
    let dia = getIntegerOrDefault(req.query.dia, 0)
    if (ano == 0 || mes == 0 || dia == 0) {
        res.status(400).send('Fecha inválida')
    } else res.status(200).send('Fecha inválida')
})

app.get('/matematica/sumar', (req, res) => {
    let n1 = getIntegerOrDefault(req.query.n1, null)
    let n2 = getIntegerOrDefault(req.query.n2, null)
    if (n1 != null && n2 != null)
        res.send(`Status 200 (OK) -- ${n1} + ${n2} = ${sumar(n1, n2)}`)
    else res.send(`Status 400 (ERROR)`)
})

app.get('/matematica/multiplicar', (req, res) => {
    let n1 = getIntegerOrDefault(req.query.n1, null)
    let n2 = getIntegerOrDefault(req.query.n2, null)
    if (n1 != null && n2 != null)
        res.status(200).send(`Status 200 (OK) -- ${n1} * ${n2} = ${multiplicar(n1, n2)}`)
    else res.status(400).send(`Status 400 (ERROR)`)
})

app.get('/matematica/restar', (req, res) => {
    let n1 = getIntegerOrDefault(req.query.n1, null)
    let n2 = getIntegerOrDefault(req.query.n2, null)
    if (n1 != null && n2 != null)
        res.send(`Status 200 (OK) -- ${n1} - ${n2} = ${restar(n1, n2)}`)
    else res.send(`Status 400 (ERROR)`)

})

app.get('/matematica/dividir', (req, res) => {
    let n1 = getIntegerOrDefault(req.query.n1, null)
    let n2 = getIntegerOrDefault(req.query.n2, null)
    if (n1 != null && n2 != null)
        res.send(`Status 200 (OK) -- ${n1} / ${n2} = ${dividir(n1, n2)}`)
    else res.send(`Status 400 (ERROR)`)

})

app.get('/omdb/searchbypage', async (req, res) => {
    try {

        let titulo = getStringOrDefault(req.query.title, '')
        let pagina = getIntegerOrDefault(req.query.page, 0)
        if (titulo != '' && pagina != 0) {
            let data = await OMDBSearchByPage(req.query.title, req.query.page)
            let objeto = armarEnvelopeOMDB(data)
            res.status(200).send(objeto)
        } else if (titulo == '') { res.status(400).send("Debes ingresar un Titulo!") }
        else  res.status(400).send("Debes ingresar una pagina!") 

    } catch (ex) {
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
})

app.get('/omdb/searchcomplete', async (req, res) => {
    try {
        let titulo = getStringOrDefault(req.query.title, '')
        if (titulo != '') {
            let data = await OMDBSearchComplete(req.query.title)
            let objeto = armarEnvelopeOMDB(data)
            res.status(200).send(objeto)
        } else res.status(400).send("Debes ingresar un titulo!")

    } catch (ex) {
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
})

app.get('/omdb/getbyimdbid', async (req, res) => {
    try {
        let id = getStringOrDefault(req.query.id, '')
        if (id != '') { 
            let data = await OMDBGetByImdbID(id)
        let objeto = armarEnvelopeOMDB(data)
        res.status(200).send(objeto)
        }else res.status(400).send("Debes ingresar un ID!")

    } catch (ex) {
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
})

app.get('/alumnos', (req, res) => {

    res.status(200).send(alumnosArray);
})

app.get('/alumnos/:dni', (req, res) => {
    let DNI = getStringOrDefault(req.params.dni, '')
    if(DNI == ''){
        res.status(400).send('Debes ingresar un DNI!')
    } else{
        const alumno = alumnosArray.find(item => item.dni === DNI);
        if(alumno == null){
            res.status(404).send('No se encontro el alumno')
        }else res.status(200).send(alumno)
    }
})

app.post('/alumnos/', (req, res) => {
    let nombre = getStringOrDefault(req.query.nombre, '')
    let dni = getStringOrDefault(req.query.dni, '')
    let edad = getIntegerOrDefault(req.query.edad, 0)
    if(nombre == '' || dni == '' || edad == 0){
        res.status(400).send('Debes ingresar un nombre, un DNI y una edad!')
        return
    }else{
        let yaExiste = alumnosArray.find(item => item.dni === dni);
        if(yaExiste != undefined){
            res.status(400).send('Ya existe un alumno con ese DNI!')
            return
        }else{
            let alumnito = new Alumno(nombre, dni, edad)
            alumnosArray.push(alumnito)
            res.status(201).send('Se añadio el alumno');
        }
}

app.delete('/alumnos/', (req, res) => {

    try {
        let DNI = getStringOrDefault(req.params.dni, '')
        if(DNI == ''){
            res.status(400).send('Debes ingresar un DNI!')
            return
        }else{

        let indexfeo = alumnosArray.findIndex(item => item.dni === req.params.dni);
        alumnosArray.splice(indexfeo, 1)
        res.status(200).send('Se borro el alumno');

        }
    }
    catch (ex) {
        console.log(ex.message);
        res.status(404).send('No se encontro el alumno')
    }
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
})
