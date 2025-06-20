import express from "express";
import employeeRoutes from "./Routes/employee.routes.js";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

const app = express();

// parse json request body
app.use(express.json());

// gzip compression
app.use(compression());

// Allow CORS policy
app.use(
  cors({
    origin: ["http://localhost:5173", "https://employees-pro.netlify.app"],
    credentials: true,
  })
);

// set security HTTP headers
app.use(helmet());

//products routes
app.use("/api/v1/employee", employeeRoutes);

//handle invalid route
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

//handle internal server error
app.use((err, req, res, next) => {
  console.log("Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
