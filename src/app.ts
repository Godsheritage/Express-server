import express from 'express'
import router from './routes/routes';

const app = express();


// for parameterized routing with error handling

app.use('/', router)



export default app