import express from 'express'
import cors from 'cors'
import { POSTGRE_URL } from './config.js'
import pg from 'pg'

const app = express();
app.use(express.json());


app.use(cors(
     {origin: '*'}
))

//CONEXIÓN A BASE DE DATOS
export const itemsPool = new pg.Pool({
    connectionString: POSTGRE_URL,
    ssl: {  
        rejectUnauthorized: false
    }
});


import changesRouter from './routes/changes.js';
app.use('/changes', changesRouter);

import searchesRouter from './routes/searches.js';
app.use('/searches', searchesRouter);

app.listen(8000, () => {
    console.log('server started')
});