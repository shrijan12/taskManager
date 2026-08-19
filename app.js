import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

//importing these routes from the routes folder
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

//here, lets use middlewares first
app.use(helmet()); //this helps us to secure our app by setting several HTTP headers
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json()); //this will help us to parse incoming request with JSON Payloads
app.use(express.urlencoded({ extended: true })); //this will help us to parse incoming request with urlencoded payloads

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //this will help us to log the request in development mode
}

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

// app.use(notFound);
// app.use(errorHandler);

export default app;
