import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json());


app.use(cors(
     {origin: '*'}
))


app.get('/primero', async (req,res) => {
    try {
        res.send({hola:"hola"});
    } catch (error) {
        console.error('Error al pedir', error);
        res.status(500).send('Error al pedir');
    }
});

app.listen(8000, () => {
    console.log('server started')
});