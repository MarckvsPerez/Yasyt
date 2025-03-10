import { Router } from "express";
import { EmpleadoController } from "../controllers/EmpleadoController";

const router = Router();

// Rutas para empleados
router.get("/", EmpleadoController.obtenerEmpleados);
router.get("/buscar", EmpleadoController.buscarEmpleadosPorNombre);
router.get("/importar", EmpleadoController.importarEmpleadosDesdeAPI);
router.get("/:id", EmpleadoController.obtenerEmpleadoPorId);
router.post("/", EmpleadoController.crearEmpleado);
router.put("/:id", EmpleadoController.actualizarEmpleado);
router.delete("/:id", EmpleadoController.eliminarEmpleado);
router.delete("/", EmpleadoController.eliminarEmpleadoPorNombre);

export default router;
