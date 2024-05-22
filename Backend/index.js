import express from "express";
import cors from 'cors'
import Connect from "./comman/connection.js";
import router from "./Routes/authRoutes.js";
const app = express();
app.use(express.json());

app.use(cors())
app.use(router)
Connect();
const port = 9955;

app.listen(port, () => {
  console.log("server in running on:", port);
});
