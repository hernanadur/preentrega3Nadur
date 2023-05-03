function createPseudoaleatorio() {
  return Math.round(Math.random() * 1001);
}

function generarLegajo(coleccion = []) {
  let numeroPseudoAleatorio = createPseudoaleatorio();
  while (coleccion.some((elemento) => elemento === numeroPseudoAleatorio)) {
    numeroPseudoAleatorio = createPseudoaleatorio();
  }
  return numeroPseudoAleatorio;
}

function hideMessage() {
  let messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";
}

function showMessage(
  messages = [],
  type = "success",
  title = "Título no definido"
) {
  let messagesContainer = document.getElementById("messages");
  let messageBody = document.createElement("div");
  messageBody.setAttribute("role", "alert");
  messageBody.setAttribute("class", `alert alert-${type}`);

  let titleBody = document.createElement("h4");
  titleBody.setAttribute("class", "alert-heading");
  titleBody.innerText = title;
  messageBody.append(titleBody);

  let divider = document.createElement("hr");
  messageBody.append(divider);

  messages.forEach((msjs) => {
    let messageItem = document.createElement("p");
    messageItem.setAttribute("class", "mb-0");
    messageItem.innerText = msjs;
    messageBody.append(messageItem);
  });

  messagesContainer.append(messageBody);
}

function showSuccessMessage(messages = [], title = "Operación exitosa") {
  showMessage(messages, "success", title);
}

function showErrorMessage(messages = [], title = "Encontramos errores :(") {
  showMessage(messages, "danger", title);
}
