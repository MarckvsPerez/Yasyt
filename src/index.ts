import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import empleadoRoutes from "./routes/empleadoRoutes";

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    message: "API de Gestión de Empleados",
    version: "1.0.0",
    endpoints: {
      empleados: "/api/empleados",
    },
  });
});

// Rutas de la API
app.use("/api/empleados", empleadoRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
