class Curso {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
  }

  toString() {
    return this.nombre.toUpperCase();
  }
}
