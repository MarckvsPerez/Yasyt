import { Request, Response } from "express";
import { GestorEmpleados } from "../services/GestorEmpleados";
import { ApiService } from "../services/ApiService";

// Instancia del gestor de empleados (singleton)
const gestorEmpleados = new GestorEmpleados();

/**
 * Controlador para manejar las peticiones relacionadas con los empleados.
 */
export class EmpleadoController {
  /**
   * Obtiene todos los empleados.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async obtenerEmpleados(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const empleados = gestorEmpleados.listarEmpleados();
      res.status(200).json({
        success: true,
        data: empleados.map((emp) => emp.toJSON()),
        count: empleados.length,
      });
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener la lista de empleados",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Obtiene un empleado por su ID.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async obtenerEmpleadoPorId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Se requiere el ID del empleado",
        });
        return;
      }

      const empleado = gestorEmpleados.buscarEmpleadoPorId(id);

      if (!empleado) {
        res.status(404).json({
          success: false,
          message: `No se encontró ningún empleado con el ID: ${id}`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: empleado.toJSON(),
      });
    } catch (error) {
      console.error("Error al obtener empleado por ID:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener el empleado",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Busca empleados por nombre.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async buscarEmpleadosPorNombre(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { nombre } = req.query;

      if (!nombre || typeof nombre !== "string") {
        res.status(400).json({
          success: false,
          message: "Se requiere el nombre del empleado",
        });
        return;
      }

      const empleados = gestorEmpleados.buscarEmpleadoPorNombre(nombre);

      res.status(200).json({
        success: true,
        data: empleados.map((emp) => emp.toJSON()),
        count: empleados.length,
      });
    } catch (error) {
      console.error("Error al buscar empleados por nombre:", error);
      res.status(500).json({
        success: false,
        message: "Error al buscar empleados",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Crea un nuevo empleado.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async crearEmpleado(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { nombre, edad, salario, email, telefono, foto } = req.body;

      // Validar campos obligatorios
      if (!nombre || !edad || salario === undefined) {
        res.status(400).json({
          success: false,
          message: "Se requieren los campos: nombre, edad y salario",
        });
        return;
      }

      // Convertir a los tipos correctos
      const edadNum = Number(edad);
      const salarioNum = Number(salario);

      // Crear el empleado
      const nuevoEmpleado = gestorEmpleados.agregarEmpleado(
        nombre,
        edadNum,
        salarioNum,
        email || "",
        telefono || "",
        foto || ""
      );

      res.status(201).json({
        success: true,
        message: "Empleado creado exitosamente",
        data: nuevoEmpleado.toJSON(),
      });
    } catch (error) {
      console.error("Error al crear empleado:", error);
      res.status(400).json({
        success: false,
        message: "Error al crear el empleado",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Actualiza un empleado existente.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async actualizarEmpleado(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, edad, salario, email, telefono, foto } = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Se requiere el ID del empleado",
        });
        return;
      }

      // Preparar datos para actualizar
      const datosActualizados: any = {};

      if (nombre !== undefined) datosActualizados.nombre = nombre;
      if (edad !== undefined) datosActualizados.edad = Number(edad);
      if (salario !== undefined) datosActualizados.salario = Number(salario);
      if (email !== undefined) datosActualizados.email = email;
      if (telefono !== undefined) datosActualizados.telefono = telefono;
      if (foto !== undefined) datosActualizados.foto = foto;

      // Actualizar el empleado
      const empleadoActualizado = gestorEmpleados.actualizarEmpleado(
        id,
        datosActualizados
      );

      if (!empleadoActualizado) {
        res.status(404).json({
          success: false,
          message: `No se encontró ningún empleado con el ID: ${id}`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Empleado actualizado exitosamente",
        data: empleadoActualizado.toJSON(),
      });
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      res.status(400).json({
        success: false,
        message: "Error al actualizar el empleado",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Elimina un empleado por su ID.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async eliminarEmpleado(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Se requiere el ID del empleado",
        });
        return;
      }

      const eliminado = gestorEmpleados.eliminarEmpleadoPorId(id);

      if (!eliminado) {
        res.status(404).json({
          success: false,
          message: `No se encontró ningún empleado con el ID: ${id}`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Empleado eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar el empleado",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Elimina un empleado por su nombre.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async eliminarEmpleadoPorNombre(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { nombre } = req.query;

      if (!nombre || typeof nombre !== "string") {
        res.status(400).json({
          success: false,
          message: "Se requiere el nombre del empleado",
        });
        return;
      }

      const eliminado = gestorEmpleados.eliminarEmpleadoPorNombre(nombre);

      if (!eliminado) {
        res.status(404).json({
          success: false,
          message: `No se encontró ningún empleado con el nombre: ${nombre}`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Empleado(s) eliminado(s) exitosamente",
      });
    } catch (error) {
      console.error("Error al eliminar empleado por nombre:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar el empleado",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Importa empleados desde la API externa.
   * @param req Objeto de solicitud
   * @param res Objeto de respuesta
   */
  public static async importarEmpleadosDesdeAPI(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { cantidad } = req.query;
      const cantidadNum = cantidad ? Number(cantidad) : 5;

      if (isNaN(cantidadNum) || cantidadNum < 1) {
        res.status(400).json({
          success: false,
          message: "La cantidad debe ser un número mayor o igual a 1",
        });
        return;
      }

      // Obtener datos de la API
      const empleadosAPI = await ApiService.obtenerEmpleados(cantidadNum);

      // Agregar los empleados al gestor
      const empleadosAgregados = empleadosAPI.map((emp) => {
        const salario = ApiService.generarSalarioAleatorio();
        return gestorEmpleados.agregarEmpleado(
          emp.nombre,
          emp.edad,
          salario,
          emp.email,
          emp.telefono,
          emp.foto
        );
      });

      res.status(201).json({
        success: true,
        message: `${empleadosAgregados.length} empleados importados exitosamente`,
        data: empleadosAgregados.map((emp) => emp.toJSON()),
      });
    } catch (error) {
      console.error("Error al importar empleados desde la API:", error);
      res.status(500).json({
        success: false,
        message: "Error al importar empleados desde la API",
        error: (error as Error).message,
      });
    }
  }
}
