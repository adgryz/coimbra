import express from 'express';

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Coimbra Server')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})