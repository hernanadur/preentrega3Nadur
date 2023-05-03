const TIPOSDOCUMENTO = [
  new TipoDocumento(1, "Documento Nacional de Identidad", "DNI"),
  new TipoDocumento(2, "Libreta de Enrolamiento", "LE"),
  new TipoDocumento(3, "Libreta Cívica", "LC"),
];

function buscarTipoDocumentoById(id) {
  return TIPOSDOCUMENTO.find((element) => element.id === id);
}

let tiposList = document.getElementById("TIPOSDOCUMENTO");
TIPOSDOCUMENTO.forEach((unDocumento) => {
  let item = document.createElement("option");
  item.value = unDocumento.id.toString();
  item.innerText = unDocumento.toString();
  tiposList.append(item);
});

let misCursos = [
  new Curso(1, "Primer Nivel de Supervivencia", 100000),
  new Curso(2, "Segundo Nivel de Supervivencia", 120000),
  new Curso(3, "Tercer Nivel de Supervivencia", 140000),
  new Curso(4, "Tactico de Supervivencia", 160000),
  new Curso(5, "Primitivo de Supervivencia", 180000),
];

sessionStorage.setItem("misCursos", JSON.stringify(misCursos));
console.log(
  " Todos mis cursos son: ",
  misCursos.map((unCurso) => unCurso.nombre)
);

function buscarCursoById(id) {
  return misCursos.find((element) => element.id === id);
}

let cursoslist = document.getElementById("misCursos");
misCursos.forEach((unCurso) => {
  let item = document.createElement("option");
  item.value = unCurso.id.toString();
  item.innerText = unCurso.toString();
  cursoslist.append(item);
});

const ALUMNOS = [];

function buscarAlumnos(tipoDocumento, documento) {
  return ALUMNOS.find(
    (element) =>
      element.tipoDocumento.id === tipoDocumento.id &&
      element.documento.toUpperCase() === documento.toUpperCase()
  );
}

function crearAlumno() {
  const idTipoDocumento = document.getElementById("TIPOSDOCUMENTO").value;
  const documento = document.getElementById("documento").value;
  const apellidos = document.getElementById("apellidos").value;
  const nombres = document.getElementById("nombres").value;
  const correo = document.getElementById("correo").value;
  const curso = document.getElementById("misCursos").value;

  let unCurso = buscarCursoById(parseInt(curso));
  if (!unCurso) {
    showErrorMessage(["No se encuentra el tipo de documento seleccionado"]);
    return false;
  }

  let unTipoDocumento = buscarTipoDocumentoById(parseInt(idTipoDocumento));
  if (!unTipoDocumento) {
    showErrorMessage(["No se encuentra el tipo de documento seleccionado"]);
    return false;
  }

  let unAlumno = buscarAlumnos(unTipoDocumento, documento);
  if (!unAlumno) {
    unAlumno = new Alumno(
      generarLegajo(ALUMNOS.map((element) => element.id)),
      unTipoDocumento,
      documento,
      apellidos,
      nombres,
      correo,
      curso
    );

    ALUMNOS.push(unAlumno);
    localStorage.setItem("ALUMNOS", JSON.stringify(ALUMNOS));
  } else {
    showErrorMessage([
      "Alumno con Tipo (" +
        unTipoDocumento.toString().toUpperCase() +
        ") y N° de Documento (" +
        documento +
        ") ya se encuentra registrado.",
    ]);
    return false;
  }
  pintarTabla(ALUMNOS);
  return true;
}

const formulario = document.getElementById("formulario");

function pintarTabla(collection = []) {
  let bodyTable = document.getElementById("tableBody");
  bodyTable.innerHTML = "";
  collection.forEach((element) => {
    let record = document.createElement("tr");
    record.innerHTML = `<tr>
      <td scope="row">${element.id}</td>
      <td>${
        "(" +
        element.tipoDocumento.abreviatura.toUpperCase() +
        ") " +
        element.documento
      }</td>
      <td>${element.toString()}</td>
      <td>${element.correo.toString()}</td>
    </tr>`;
    bodyTable.append(record);
  });
}

function limpiarCampos() {
  formulario.reset();
}

function validarFormulario() {
  let errores = [];
  const idTipoDocumento = document.getElementById("TIPOSDOCUMENTO").value;

  const documento = document.getElementById("documento").value;

  const apellidos = document.getElementById("apellidos").value;

  const nombres = document.getElementById("nombres").value;

  const correo = document.getElementById("correo").value;

  const curso = document.getElementById("misCursos").value;

  return errores;
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.setAttribute("class", "needs-validation");
  hideMessage();
  let errores = validarFormulario();
  if (errores.length > 0) {
    showErrorMessage(errores);
    event.target.classList.add("was-validated");
    return false;
  }

  let resultado = crearAlumno();
  if (resultado) {
    showSuccessMessage(["Alumno registrado correctamente!"]);
    limpiarCampos();
  }
  return resultado;
});

const formularioBuscador = document.getElementById("buscador");
formularioBuscador.addEventListener("submit", (event) => {
  event.preventDefault();
  hideMessage();
  const BuscadorTexto = document.getElementById("BuscadorTexto").value;

  if (BuscadorTexto.length < 1) {
    showErrorMessage(["Por favor ingresar informacion que desea buscar"]);
    return false;
  }

  let resultados = ALUMNOS.filter(
    (element) =>
      element.nombres.toUpperCase().includes(BuscadorTexto.toUpperCase()) ||
      element.apellidos.toUpperCase().includes(BuscadorTexto.toUpperCase())
  );
  if (resultados.length < 1) {
    showErrorMessage([
      "No encontramos registros que coincidan con la búsqueda",
    ]);
    return false;
  }

  pintarTabla(resultados);
  return true;
});
