//importing dependency
import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./config/db.js";


dotenv.config(); //helps to load environment from .env

//setting up port from env
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDb(); //connect to database

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
