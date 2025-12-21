import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import authRoutes from "./modules/auth/auth.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PlaySync API",
      version: "1.0.0",
      description: "API documentation for PlaySync backend"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ] 
  },
  apis: ["./src/modules/**/*.ts"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Routes
app.use("/auth", authRoutes);

// Health check
app.get("/", (_req, res) => {
  res.send(
    '<h1>Server running 🚀 <a href="/swagger">Swagger Docs</a></h1>'
  );
});

export default app;
