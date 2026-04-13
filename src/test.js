import express from "express";
import cors from "cors";
import { multiplicar, PI, sumar, dividir, restar } from '../src/modules/matematica.js';
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js"
import {armarEnvelopeOMDB} from "./modules/envelope.js"

const app = express()
const port = 3000
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
app.get('/', (req, res) => {
    // EndPoint "/", verbo GET
    res.send('YA ESTOY RESPONDIENDO!');
})

app.get('/saludar/:nombre', (req, res) => {
    res.send('Hola ' + req.params.nombre + ', espero que tengas un hermoso dia')
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    if (!isNaN(req.params.ano) && !isNaN(req.params.mes) && !isNaN(req.params.dia)) {
        let fechaConcatenada =`"${req.params.ano}-${req.params.mes}-${req.params.dia}"` 
        if (!isNaN(Date.parse(fechaConcatenada))) {
            res.status(200).send('Fecha válida')
        }
    }
    else res.status(400).send('Fecha inválida')

})

app.get('/matematica/sumar', (req, res) =>{
    
    res.send(`Status 200 (OK) -- ${req.query.n1} + ${req.query.n2} = ${sumar(req.query.n1, req.query.n2)}`)
})

app.get('/matematica/multiplicar', (req, res) =>{
    
    res.send(`Status 200 (OK) -- ${req.query.n1} * ${req.query.n2} = ${multiplicar(req.query.n1, req.query.n2)}`)
})

app.get('/matematica/restar', (req, res) =>{
    
    res.send(`Status 200 (OK) -- ${req.query.n1} - ${req.query.n2} = ${restar(req.query.n1, req.query.n2)}`)
})

app.get('/matematica/dividir', (req, res) =>{
    
    res.send(`Status 200 (OK) -- ${req.query.n1} / ${req.query.n2} = ${dividir(req.query.n1, req.query.n2)}`)
})

app.get('/omdb/searchbypage', async (req, res) =>{
    try{
    let data = await OMDBSearchByPage(req.query.title, req.query.page)
    let objeto =  armarEnvelopeOMDB( data )
    res.status(200).send(objeto) 

    }catch(ex){
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
})

app.get('/omdb/searchcomplete', async (req, res) =>{
    try{
    let data = await OMDBSearchComplete(req.query.title)
    let objeto =  armarEnvelopeOMDB( data )
    res.status(200).send(objeto) 

    }catch(ex){
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})