import axios from "axios";

/**
 * Interfaz que define la estructura de los datos de un usuario de la API Random User.
 */
interface RandomUserResponse {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    email: string;
    phone: string;
    dob: {
      age: number;
    };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    login: {
      uuid: string;
    };
  }>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

/**
 * Interfaz que define la estructura de los datos de un empleado obtenido de la API.
 */
export interface EmpleadoAPI {
  id: string;
  nombre: string;
  edad: number;
  email: string;
  telefono: string;
  foto: string;
}

/**
 * Clase que proporciona métodos para interactuar con la API externa.
 */
export class ApiService {
  private static readonly API_URL = "https://randomuser.me/api/";

  /**
   * Obtiene datos de empleados ficticios de la API Random User.
   * @param cantidad Cantidad de empleados a obtener
   * @returns Promise con un array de datos de empleados
   */
  public static async obtenerEmpleados(
    cantidad: number = 1
  ): Promise<EmpleadoAPI[]> {
    try {
      // Validar la cantidad
      if (cantidad < 1) {
        throw new Error("La cantidad debe ser al menos 1");
      }

      // Realizar la petición a la API
      const response = await axios.get<RandomUserResponse>(this.API_URL, {
        params: {
          results: cantidad,
          nat: "es", // Nacionalidad española para obtener nombres en español
          inc: "name,email,phone,dob,picture,login", // Incluir solo los campos necesarios
        },
      });

      // Transformar los datos recibidos al formato deseado
      return response.data.results.map((user) => ({
        id: user.login.uuid,
        nombre: `${user.name.first} ${user.name.last}`,
        edad: user.dob.age,
        email: user.email,
        telefono: user.phone,
        foto: user.picture.medium,
      }));
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      throw new Error(
        "No se pudieron obtener datos de empleados de la API externa"
      );
    }
  }

  /**
   * Genera un salario aleatorio para un empleado.
   * @returns Salario aleatorio entre 1000 y 5000
   */
  public static generarSalarioAleatorio(): number {
    return Math.floor(Math.random() * 4000) + 1000; // Salario entre 1000 y 5000
  }
}
