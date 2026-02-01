import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//import the user router
import userRouter from './routes/user.js';
import authRoutes from "./middleware/auth.js";

//configure environment variables
dotenv.config();

//create an Express app
const app = express();

app.use(cors());

//middleware to parse JSON requests
app.use(express.json());

//register the user router
app.use('/user', userRouter);
//use the auth routes
app.use("/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

const PORT = process.env.PORT || 3000;

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
