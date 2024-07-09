import express from "express";
import cors from 'cors'
import Connect from "./comman/connection.js";
import router from "./Routes/authRoutes.js";
import AdminRouter from "./Routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./Routes/cartRoutes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors())
app.use(router)
app.use(AdminRouter)
app.use("/api/cart", cartRoutes);



Connect();
const port = 9955;

app.listen(port, () => {
  console.log("server in running on:", port);
});

// app.get('/health', async (req, res) => {
//   const dbState = mongoose.connection.readyState;
//   const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
//   res.status(200).send(`Server is healthy. Database status: ${states[dbState]}`);
// });
