/**
 * Clase que representa a un empleado en el sistema.
 */
export class Empleado {
  private id: string;
  private nombre: string;
  private edad: number;
  private salario: number;
  private email: string;
  private telefono: string;
  private foto: string;

  /**
   * Constructor de la clase Empleado.
   * @param id Identificador único del empleado
   * @param nombre Nombre completo del empleado
   * @param edad Edad del empleado
   * @param salario Salario del empleado
   * @param email Correo electrónico del empleado
   * @param telefono Número de teléfono del empleado
   * @param foto URL de la foto del empleado
   */
  constructor(
    id: string,
    nombre: string,
    edad: number,
    salario: number,
    email: string = "",
    telefono: string = "",
    foto: string = ""
  ) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.salario = salario;
    this.email = email;
    this.telefono = telefono;
    this.foto = foto;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getEdad(): number {
    return this.edad;
  }

  public getSalario(): number {
    return this.salario;
  }

  public getEmail(): string {
    return this.email;
  }

  public getTelefono(): string {
    return this.telefono;
  }

  public getFoto(): string {
    return this.foto;
  }

  // Setters
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setEdad(edad: number): void {
    this.edad = edad;
  }

  public setSalario(salario: number): void {
    this.salario = salario;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setTelefono(telefono: string): void {
    this.telefono = telefono;
  }

  public setFoto(foto: string): void {
    this.foto = foto;
  }

  /**
   * Convierte el objeto Empleado a un objeto JSON.
   * @returns Objeto JSON con los datos del empleado
   */
  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      nombre: this.nombre,
      edad: this.edad,
      salario: this.salario,
      email: this.email,
      telefono: this.telefono,
      foto: this.foto,
    };
  }
}
