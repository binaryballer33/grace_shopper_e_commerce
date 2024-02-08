import morgan from "morgan";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();

// Load environment variables
dotenv.config();

// Logging middleware
app.use(morgan("dev"));

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
