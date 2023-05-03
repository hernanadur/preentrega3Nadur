class Alumno {
  constructor(id, unTipo, documento, apellidos, nombres, correo) {
    this.id = id;
    this.apellidos = apellidos.trim();
    this.nombres = nombres.trim();
    this.documento = documento.toString().trim();
    this.tipoDocumento = unTipo;
    this.correo = correo.trim();
  }

  toString() {
    return this.apellidos.toUpperCase() + ", " + this.nombres.toUpperCase();
  }
}
