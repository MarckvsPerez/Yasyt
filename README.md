# Sistema de Gestión de Empleados

API RESTful y aplicación de consola para gestionar empleados, desarrollada con Node.js, Express y TypeScript.

## Características

- Crear, listar, actualizar y eliminar empleados
- Buscar empleados por nombre
- Importar empleados desde la API externa [Random User API](https://randomuser.me/)
- Validación de datos
- Manejo de errores
- Interfaz de consola interactiva con diseño mejorado
- Visualización detallada de información adicional obtenida de la API

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clonar el repositorio:

   ```
   git clone https://github.com/tu-usuario/sistema-gestion-empleados.git
   cd sistema-gestion-empleados
   ```

2. Instalar dependencias:

   ```
   npm install
   ```

3. Configurar variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto (puedes usar `.env.example` como referencia)
   - Define las variables necesarias (por ejemplo, `PORT=3000`)

## Ejecución

### API REST

#### Desarrollo

```
npm run dev
```

#### Producción

```
npm run build
npm start
```

### Aplicación de Consola

Para ejecutar la aplicación de consola interactiva:

```
npm run console
```

La aplicación de consola permite:

- Agregar nuevos empleados ingresando su información
- Listar todos los empleados con su información detallada
- Eliminar empleados por nombre
- Importar empleados desde la API externa
- Buscar empleados por nombre

#### Características de la Aplicación de Consola

- Interfaz de usuario mejorada con bordes y formato atractivo
- Visualización detallada de la información obtenida de la API externa
- Resumen de empleados importados con opción para ver detalles completos
- Navegación intuitiva entre las diferentes funcionalidades

## Endpoints de la API

### Empleados

- `GET /api/empleados` - Obtener todos los empleados
- `GET /api/empleados/:id` - Obtener un empleado por ID
- `GET /api/empleados/buscar?nombre=Juan` - Buscar empleados por nombre
- `GET /api/empleados/importar?cantidad=5` - Importar empleados desde la API externa
- `POST /api/empleados` - Crear un nuevo empleado
- `PUT /api/empleados/:id` - Actualizar un empleado existente
- `DELETE /api/empleados/:id` - Eliminar un empleado por ID
- `DELETE /api/empleados?nombre=Juan` - Eliminar empleados por nombre

## Estructura del Proyecto

```
├── src/
│   ├── controllers/     # Controladores
│   ├── models/          # Modelos
│   ├── routes/          # Rutas
│   ├── services/        # Servicios
│   ├── utils/           # Utilidades
│   ├── index.ts         # Punto de entrada de la API REST
│   └── console-app.ts   # Aplicación de consola interactiva
├── .env                 # Variables de entorno
├── .gitignore           # Archivos ignorados por git
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
└── README.md            # Documentación
```

## Licencia

ISC
