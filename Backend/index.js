import express from 'express'
import Connect from './comman/connection.js'
const app = express();

Connect();
const port = 9900;

app.listen(port,()=>{
    console.log("server in running on:",port)
})