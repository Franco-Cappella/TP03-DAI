import express from "express";
import cors from "cors";
import { multiplicar, PI, sumar, dividir, restar } from '../src/modules/matematica.js';
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js"

const app = express()
const port = 3000
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
app.get('/', (req, res) => {
    // EndPoint "/", verbo GET
    res.send('YA ESTOY RESPONDIENDO!');
})

app.get('/saludar/:nombre', (req, res) => {
    res.send('Hola: ' + req.params.nombre)
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    if (!isNaN(req.params.ano) && !isNaN(req.params.mes) && !isNaN(req.params.dia)) {

        if (Date.parse(`"${req.params.ano} - ${req.params.mes} - ${req.params.dia}"`)) {
            res.send(200)
        }
    }
    else res.send(400)  

})
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})