const input = document.getElementById("input");
const tareasCont = document.getElementById("contenedor-tareas");

const tareas = getTareasLS();
tareas.forEach((e) => {
  setTarea(e);
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    setTarea(input.value);
    if (input.value != "") {
      addTareaLS(input.value);
    }

    input.value = null;
  }
});

function setTarea(texto) {
  if (texto != "") {
    const div = document.createElement("div");
    div.classList.add("cont-receta");
    div.innerHTML = texto;

    tareasCont.appendChild(div);

    div.addEventListener("click", () => {
      div.classList.toggle("completa");
    });

    div.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      removeTareaLS(texto);
      div.remove();
    });
  }
}

function addTareaLS(texto) {
  const tareas = getTareasLS();

  localStorage.setItem("tarea", JSON.stringify([...tareas, texto]));
}

function removeTareaLS(texto) {
  const tareas = getTareasLS();
  localStorage.setItem(
    "tarea",
    JSON.stringify(tareas.filter((tarea) => tarea != texto))
  );
}

function getTareasLS() {
  const tareas = JSON.parse(localStorage.getItem("tarea"));
  return tareas === null ? [] : tareas;
}
