const express = require('express');
const cors = require('cors');

const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))

app.use(cors());

// Cuando se haga un get http://localhost:3000/transaction
app.get('/transaction', (req, res) => {
    res.send('El metodo get fue ejecutado')
})

// Cuando se haga un post http://localhost:3000/transaction
app.post('/transaction', (req, res) => {
    console.log(req.body);
    res.send('El metodo post fue ejecutado')
}) 

app.listen(port, () => {
    console.log(`Ubicacion de ejecucion http://localhost:${port}`);
})