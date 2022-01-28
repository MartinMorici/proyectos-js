const addBtn = document.getElementById("add-nota");
const notasContainer = document.getElementById("notas-container");
const notas = JSON.parse(localStorage.getItem("notas"));

if (notas) {
  notas.forEach((e) => {
    añadirNota(e);
  });
}

addBtn.addEventListener("click", () => {
  añadirNota();
});

function añadirNota(texto = "") {
  const nota = document.createElement("div");
  nota.classList.add("nota");

  nota.innerHTML = `
                <div class="nota-iconos">
                    <i class="fas fa-edit editar"> <span>Editar/Guardar</span></i>
                    <i class="fas fa-trash borrar"></i>
                </div>
                <div class="div-texto ${texto ? "" : "hidden"}"></div>
                <textarea class="${texto ? "hidden" : ""}"></textarea>
                `;

  const btnEdit = nota.querySelector(".editar");
  const btnBorrar = nota.querySelector(".borrar");
  const divTexto = nota.querySelector(".div-texto");
  const textArea = nota.querySelector("textarea");

  textArea.value = texto;
  divTexto.innerHTML = texto;

  btnEdit.addEventListener("click", () => {
    divTexto.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    divTexto.innerHTML = textArea.value;
    guardarNotaLS();
  });

  btnBorrar.addEventListener("click", () => {
    nota.remove();
    guardarNotaLS();
  });

  notasContainer.appendChild(nota);
}

function guardarNotaLS() {
  const notas = document.querySelectorAll("textarea");
  const notasLS = [];

  notas.forEach((e) => {
    notasLS.push(e.value);
  });

  localStorage.setItem("notas", JSON.stringify(notasLS));
}
