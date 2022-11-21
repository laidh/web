const express = require('express')
const cors = require('cors')

const gems = require('./gemService')
const { create } = require("./gemService");

const app = express()
const port = 3000

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors())
app.use(express.json());
app.get('*', cors(corsOptions))
app.post('*', cors(corsOptions))
app.patch('*', cors(corsOptions))
app.delete('*', cors(corsOptions))

app.get('/gems', async (req, res) => {
        const data = await gems.getAll();
        res.status(200).json(data);
})

app.post('/gems', async (req, res) => {
    console.log(req.body);
    const data = await gems.create(req);
    res.status(200).json(data);
})

app.patch('/gems/:id', async (req, res) => {
    console.log(req.body);
    const data = await gems.update(req)
    res.status(200).json(data);
})

app.delete('/gems/:id', async (req, res) => {
    await gems.remove(req);
    res.status(204).json({method:"remove"});
})

app.listen(port, () => {
})