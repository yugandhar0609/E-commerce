import express from "express";
import cors from 'cors';
import Connect from "./comman/connection.js"; 
import authRouter from "./Routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cartRouter from "./Routes/cartRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(authRouter);
app.use('/api', cartRouter);




Connect();

const port = 9955;
app.listen(port, () => {
  console.log("Server is running on:", port);
});

// Health check endpoint
// app.get('/health', async (req, res) => {
//   const dbState = mongoose.connection.readyState;
//   const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
//   res.status(200).send(`Server is healthy. Database status: ${states[dbState]}`);
// });
