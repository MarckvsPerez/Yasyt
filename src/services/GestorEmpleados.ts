import { Empleado } from "../models/Empleado";
import { v4 as uuidv4 } from "uuid";

/**
 * Clase que gestiona la lista de empleados.
 */
export class GestorEmpleados {
  private empleados: Empleado[];

  /**
   * Constructor de la clase GestorEmpleados.
   */
  constructor() {
    this.empleados = [];
  }

  /**
   * Agrega un nuevo empleado a la lista.
   * @param nombre Nombre completo del empleado
   * @param edad Edad del empleado
   * @param salario Salario del empleado
   * @param email Correo electrónico del empleado (opcional)
   * @param telefono Número de teléfono del empleado (opcional)
   * @param foto URL de la foto del empleado (opcional)
   * @returns El empleado agregado
   */
  public agregarEmpleado(
    nombre: string,
    edad: number,
    salario: number,
    email: string = "",
    telefono: string = "",
    foto: string = ""
  ): Empleado {
    // Validar datos
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre del empleado es obligatorio");
    }

    if (edad <= 0 || edad > 120) {
      throw new Error("La edad debe estar entre 1 y 120 años");
    }

    if (salario < 0) {
      throw new Error("El salario no puede ser negativo");
    }

    // Generar ID único
    const id = uuidv4();

    // Crear y agregar el empleado
    const nuevoEmpleado = new Empleado(
      id,
      nombre,
      edad,
      salario,
      email,
      telefono,
      foto
    );
    this.empleados.push(nuevoEmpleado);

    return nuevoEmpleado;
  }

  /**
   * Obtiene la lista de todos los empleados.
   * @returns Lista de empleados
   */
  public listarEmpleados(): Empleado[] {
    return this.empleados;
  }

  /**
   * Busca un empleado por su nombre.
   * @param nombre Nombre del empleado a buscar
   * @returns Lista de empleados que coinciden con el nombre
   */
  public buscarEmpleadoPorNombre(nombre: string): Empleado[] {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre de búsqueda no puede estar vacío");
    }

    const nombreBusqueda = nombre.toLowerCase().trim();
    return this.empleados.filter((empleado) =>
      empleado.getNombre().toLowerCase().includes(nombreBusqueda)
    );
  }

  /**
   * Busca un empleado por su ID.
   * @param id ID del empleado a buscar
   * @returns El empleado encontrado o undefined si no existe
   */
  public buscarEmpleadoPorId(id: string): Empleado | undefined {
    return this.empleados.find((empleado) => empleado.getId() === id);
  }

  /**
   * Elimina un empleado por su nombre.
   * @param nombre Nombre del empleado a eliminar
   * @returns true si se eliminó al menos un empleado, false en caso contrario
   */
  public eliminarEmpleadoPorNombre(nombre: string): boolean {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    const cantidadAnterior = this.empleados.length;
    const nombreBusqueda = nombre.toLowerCase().trim();

    this.empleados = this.empleados.filter(
      (empleado) => !empleado.getNombre().toLowerCase().includes(nombreBusqueda)
    );

    return this.empleados.length < cantidadAnterior;
  }

  /**
   * Elimina un empleado por su ID.
   * @param id ID del empleado a eliminar
   * @returns true si se eliminó el empleado, false en caso contrario
   */
  public eliminarEmpleadoPorId(id: string): boolean {
    const cantidadAnterior = this.empleados.length;
    this.empleados = this.empleados.filter(
      (empleado) => empleado.getId() !== id
    );
    return this.empleados.length < cantidadAnterior;
  }

  /**
   * Actualiza los datos de un empleado.
   * @param id ID del empleado a actualizar
   * @param datosActualizados Objeto con los datos a actualizar
   * @returns El empleado actualizado o undefined si no se encontró
   */
  public actualizarEmpleado(
    id: string,
    datosActualizados: {
      nombre?: string;
      edad?: number;
      salario?: number;
      email?: string;
      telefono?: string;
      foto?: string;
    }
  ): Empleado | undefined {
    const empleado = this.buscarEmpleadoPorId(id);

    if (!empleado) {
      return undefined;
    }

    // Actualizar los datos proporcionados
    if (datosActualizados.nombre !== undefined) {
      empleado.setNombre(datosActualizados.nombre);
    }

    if (datosActualizados.edad !== undefined) {
      if (datosActualizados.edad <= 0 || datosActualizados.edad > 120) {
        throw new Error("La edad debe estar entre 1 y 120 años");
      }
      empleado.setEdad(datosActualizados.edad);
    }

    if (datosActualizados.salario !== undefined) {
      if (datosActualizados.salario < 0) {
        throw new Error("El salario no puede ser negativo");
      }
      empleado.setSalario(datosActualizados.salario);
    }

    if (datosActualizados.email !== undefined) {
      empleado.setEmail(datosActualizados.email);
    }

    if (datosActualizados.telefono !== undefined) {
      empleado.setTelefono(datosActualizados.telefono);
    }

    if (datosActualizados.foto !== undefined) {
      empleado.setFoto(datosActualizados.foto);
    }

    return empleado;
  }
}
