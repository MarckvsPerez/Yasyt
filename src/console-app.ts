import readline from "readline";
import { GestorEmpleados } from "./services/GestorEmpleados";
import { ApiService } from "./services/ApiService";

// Crear instancia del gestor de empleados
const gestorEmpleados = new GestorEmpleados();

// Crear interfaz de readline para interactuar con la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Muestra el menú principal de la aplicación con un diseño mejorado
 */
function mostrarMenu(): void {
  console.clear();

  const anchoTotal = 60;

  console.log("╔" + "═".repeat(anchoTotal) + "╗");
  console.log(
    `║${" ".repeat(
      (anchoTotal - "SISTEMA DE GESTIÓN DE EMPLEADOS".length) / 2
    )}SISTEMA DE GESTIÓN DE EMPLEADOS${" ".repeat(
      (anchoTotal - "SISTEMA DE GESTIÓN DE EMPLEADOS".length + 1) / 2
    )}║`
  );
  console.log(
    `║${" ".repeat(
      (anchoTotal - "Desarrollado con Node.js".length) / 2
    )}Desarrollado con Node.js${" ".repeat(
      (anchoTotal - "Desarrollado con Node.js".length) / 2
    )}║`
  );
  console.log("╠" + "═".repeat(anchoTotal) + "╣");

  // Función para formatear las opciones del menú
  const formatearOpcion = (texto: string) => {
    return `║  ${texto}${" ".repeat(anchoTotal - texto.length - 2)}║`;
  };

  console.log(formatearOpcion("1. Agregar un nuevo empleado"));
  console.log(formatearOpcion("2. Listar todos los empleados"));
  console.log(formatearOpcion("3. Eliminar un empleado por nombre"));
  console.log(formatearOpcion("4. Importar empleados desde API externa"));
  console.log(formatearOpcion("5. Buscar empleado por nombre"));
  console.log(formatearOpcion("0. Salir"));

  console.log("╠" + "═".repeat(anchoTotal) + "╣");
  console.log(
    formatearOpcion("La información adicional se obtiene de Random User API")
  );
  console.log("╚" + "═".repeat(anchoTotal) + "╝");

  rl.question("\nSeleccione una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        agregarEmpleado();
        break;
      case "2":
        listarEmpleados();
        break;
      case "3":
        eliminarEmpleado();
        break;
      case "4":
        importarEmpleados();
        break;
      case "5":
        buscarEmpleado();
        break;
      case "0":
        console.log("\n¡Gracias por usar el sistema!");
        rl.close();
        break;
      default:
        console.log("\nOpción no válida. Intente de nuevo.");
        setTimeout(mostrarMenu, 1500);
        break;
    }
  });
}

/**
 * Solicita los datos para agregar un nuevo empleado
 */
function agregarEmpleado(): void {
  console.clear();
  console.log("=== AGREGAR NUEVO EMPLEADO ===");

  rl.question("Nombre completo: ", (nombre) => {
    rl.question("Edad: ", (edadStr) => {
      rl.question("Salario: ", (salarioStr) => {
        rl.question("Email (opcional): ", (email) => {
          rl.question("Teléfono (opcional): ", (telefono) => {
            try {
              // Convertir y validar datos
              const edad = parseInt(edadStr);
              const salario = parseFloat(salarioStr);

              if (isNaN(edad) || edad <= 0 || edad > 120) {
                throw new Error("La edad debe ser un número entre 1 y 120");
              }

              if (isNaN(salario) || salario < 0) {
                throw new Error("El salario debe ser un número positivo");
              }

              // Agregar el empleado
              const empleado = gestorEmpleados.agregarEmpleado(
                nombre,
                edad,
                salario,
                email,
                telefono
              );

              console.log("\nEmpleado agregado exitosamente:");
              console.log(`ID: ${empleado.getId()}`);
              console.log(`Nombre: ${empleado.getNombre()}`);
              console.log(`Edad: ${empleado.getEdad()}`);
              console.log(`Salario: ${empleado.getSalario()}`);

              // Volver al menú principal después de una pausa
              rl.question("\nPresione Enter para continuar...", () => {
                mostrarMenu();
              });
            } catch (error) {
              console.error(`\nError: ${(error as Error).message}`);
              rl.question("\nPresione Enter para continuar...", () => {
                agregarEmpleado();
              });
            }
          });
        });
      });
    });
  });
}

/**
 * Lista todos los empleados registrados con información adicional
 */
function listarEmpleados(): void {
  console.clear();
  console.log("=== LISTA DE EMPLEADOS ===");

  const empleados = gestorEmpleados.listarEmpleados();

  if (empleados.length === 0) {
    console.log("No hay empleados registrados.");
  } else {
    console.log(`Total de empleados: ${empleados.length}\n`);

    empleados.forEach((empleado, index) => {
      const tieneInfoAPI =
        empleado.getEmail() || empleado.getTelefono() || empleado.getFoto();

      // Función para formatear líneas de información
      const formatearLinea = (etiqueta: string, valor: string) => {
        return `║ ${etiqueta}: ${valor}${" ".repeat(
          anchoTotal - etiqueta.length - valor.length - 3
        )}║`;
      };

      console.log("╔" + "═".repeat(anchoTotal) + "╗");
      const titulo = `║ EMPLEADO #${index + 1}`;
      console.log(`${titulo}${" ".repeat(anchoTotal - titulo.length)} ║`);
      console.log("╠" + "═".repeat(anchoTotal) + "╣");
      console.log(formatearLinea("ID", empleado.getId()));
      console.log(formatearLinea("Nombre", empleado.getNombre()));
      console.log(formatearLinea("Edad", empleado.getEdad().toString()));
      console.log(formatearLinea("Salario", empleado.getSalario().toString()));

      // Mostrar información adicional obtenida de la API
      if (tieneInfoAPI) {
        console.log("╠" + "═".repeat(anchoTotal) + "╣");
        const titulo = "║ INFORMACIÓN ADICIONAL DE LA API";
        console.log(`${titulo}${" ".repeat(anchoTotal - titulo.length)} ║`);

        if (empleado.getEmail()) {
          console.log(formatearLinea("Email", empleado.getEmail()));
        }

        if (empleado.getTelefono()) {
          console.log(formatearLinea("Teléfono", empleado.getTelefono()));
        }

        if (empleado.getFoto()) {
          console.log(formatearLinea("Foto", "Sí"));
          const texto = "║ (Para ver la foto, copia la URL en tu navegador)";
          console.log(`${texto}${" ".repeat(anchoTotal - texto.length)} ║`);
        }
      }

      console.log("╚" + "═".repeat(anchoTotal) + "╝");
      console.log("");
    });
  }

  rl.question("\nPresione Enter para continuar...", () => {
    mostrarMenu();
  });
}

/**
 * Solicita el nombre de un empleado para eliminarlo
 */
function eliminarEmpleado(): void {
  console.clear();
  console.log("=== ELIMINAR EMPLEADO POR NOMBRE ===");

  rl.question("Ingrese el nombre del empleado a eliminar: ", (nombre) => {
    try {
      const eliminado = gestorEmpleados.eliminarEmpleadoPorNombre(nombre);

      if (eliminado) {
        console.log(
          `\nSe ha(n) eliminado exitosamente el/los empleado(s) con nombre "${nombre}".`
        );
      } else {
        console.log(
          `\nNo se encontró ningún empleado con el nombre "${nombre}".`
        );
      }
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
    }

    rl.question("\nPresione Enter para continuar...", () => {
      mostrarMenu();
    });
  });
}

/**
 * Importa empleados desde la API externa y muestra información detallada
 */
async function importarEmpleados(): Promise<void> {
  console.clear();
  console.log("=== IMPORTAR EMPLEADOS DESDE API ===");

  rl.question(
    "Cantidad de empleados a importar (1-10): ",
    async (cantidadStr) => {
      try {
        const cantidad = parseInt(cantidadStr);

        if (isNaN(cantidad) || cantidad < 1 || cantidad > 10) {
          throw new Error("La cantidad debe ser un número entre 1 y 10");
        }

        console.log("\nObteniendo datos de la API...");

        // Obtener datos de la API
        const empleadosAPI = await ApiService.obtenerEmpleados(cantidad);

        console.log(
          `Se obtuvieron ${empleadosAPI.length} registros de la API.`
        );
        console.log("Agregando empleados al sistema...\n");

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

        console.log(
          `¡${empleadosAgregados.length} empleados importados exitosamente!`
        );
        console.log("\nResumen de empleados importados:");

        // Mostrar resumen de los empleados importados
        empleadosAgregados.forEach((empleado, index) => {
          console.log(`\n--- Empleado #${index + 1} ---`);
          console.log(`Nombre: ${empleado.getNombre()}`);
          console.log(`Edad: ${empleado.getEdad()}`);
          console.log(`Salario: ${empleado.getSalario()}`);
          console.log(`Email: ${empleado.getEmail()}`);

          if (empleado.getFoto()) {
            console.log(`Foto disponible: Sí`);
          }
        });

        console.log(
          "\n¿Desea ver la información completa de los empleados importados?"
        );
        rl.question("(S/N): ", (respuesta) => {
          if (respuesta.toLowerCase() === "s") {
            listarEmpleados();
          } else {
            rl.question("\nPresione Enter para continuar...", () => {
              mostrarMenu();
            });
          }
        });
      } catch (error) {
        console.error(`\nError: ${(error as Error).message}`);
        rl.question("\nPresione Enter para continuar...", () => {
          mostrarMenu();
        });
      }
    }
  );
}

/**
 * Busca empleados por nombre y muestra información detallada
 */
function buscarEmpleado(): void {
  console.clear();
  console.log("=== BUSCAR EMPLEADO POR NOMBRE ===");

  rl.question("Ingrese el nombre a buscar: ", (nombre) => {
    try {
      const empleados = gestorEmpleados.buscarEmpleadoPorNombre(nombre);

      console.log(`\nResultados de la búsqueda para "${nombre}":`);

      if (empleados.length === 0) {
        console.log("No se encontraron empleados con ese nombre.");
      } else {
        console.log(`Se encontraron ${empleados.length} empleado(s):\n`);

        empleados.forEach((empleado, index) => {
          const tieneInfoAPI =
            empleado.getEmail() || empleado.getTelefono() || empleado.getFoto();

          // Función mejorada para truncar texto
          const truncar = (texto: string, longitud: number) => {
            if (!texto) return "";
            if (texto.length <= longitud) return texto;
            return texto.substring(0, longitud - 3) + "...";
          };

          // Función mejorada para formatear texto
          const formatearTexto = (
            etiqueta: string,
            valor: string,
            anchoDatos: number
          ) => {
            const textoTruncado = truncar(valor, anchoDatos - etiqueta.length);
            return `║ ${etiqueta}: ${textoTruncado}${" ".repeat(
              anchoDatos - etiqueta.length - textoTruncado.length
            )}║`;
          };

          const anchoTotal = 60;
          const anchoDatos = 50;

          console.log("╔" + "═".repeat(anchoTotal) + "╗");
          console.log(
            `║ RESULTADO #${(index + 1)
              .toString()
              .padEnd(anchoTotal - 12, " ")} ║`
          );
          console.log("╠" + "═".repeat(anchoTotal) + "╣");
          console.log(formatearTexto("ID", empleado.getId(), anchoDatos));
          console.log(
            formatearTexto("Nombre", empleado.getNombre(), anchoDatos - 8)
          );
          console.log(
            formatearTexto(
              "Edad",
              empleado.getEdad().toString(),
              anchoDatos - 6
            )
          );
          console.log(
            formatearTexto(
              "Salario",
              empleado.getSalario().toString(),
              anchoDatos - 9
            )
          );

          // Mostrar información adicional obtenida de la API
          if (tieneInfoAPI) {
            console.log("╠" + "═".repeat(anchoTotal) + "╣");
            console.log(
              `║ INFORMACIÓN ADICIONAL DE LA API${" ".repeat(
                anchoTotal - 31
              )} ║`
            );

            if (empleado.getEmail()) {
              console.log(
                formatearTexto("Email", empleado.getEmail(), anchoDatos - 7)
              );
            }

            if (empleado.getTelefono()) {
              console.log(
                formatearTexto(
                  "Teléfono",
                  empleado.getTelefono(),
                  anchoDatos - 10
                )
              );
            }

            if (empleado.getFoto()) {
              console.log(formatearTexto("Foto", "Sí", anchoDatos - 6));
              console.log(
                `║ (Para ver la foto, copia la URL en tu navegador)${" ".repeat(
                  anchoTotal - 48
                )} ║`
              );
            }
          }

          console.log("╚" + "═".repeat(anchoTotal) + "╝");
          console.log("");
        });
      }
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
    }

    rl.question("\nPresione Enter para continuar...", () => {
      mostrarMenu();
    });
  });
}

// Iniciar la aplicación
console.clear();

const anchoTotal = 80;
console.log("╔" + "═".repeat(anchoTotal) + "╗");
console.log(
  `║${" ".repeat(15)}SISTEMA DE GESTIÓN DE EMPLEADOS${" ".repeat(15)}║`
);
console.log(`║${" ".repeat(20)}Bienvenido al Sistema${" ".repeat(20)}║`);
console.log("╚" + "═".repeat(anchoTotal) + "╝");
setTimeout(mostrarMenu, 1000);
