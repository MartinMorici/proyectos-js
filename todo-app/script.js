const input = document.getElementById("input");
const tareasCont = document.getElementById("contenedor-tareas");

const todos = JSON.parse(localStorage.getItem("tareas"));

if (todos) {
  todos.forEach((e) => {
    setTarea(e);
  });
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    setTarea();
  }
});

function setTarea(tarea) {
  let texto = input.value;

  if (tarea) {
    texto = tarea.text;
  }

  if (texto) {
    const div = document.createElement("div");
    div.classList.add("cont-receta");
    div.innerText = texto;
    if (tarea && tarea.completed) {
      div.classList.add("completa");
    }

    div.addEventListener("click", () => {
      div.classList.toggle("completa");
      updateLS();
    });

    div.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      div.remove();
      updateLS();
    });

    tareasCont.appendChild(div);
    updateLS();
    input.value = "";
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll(".cont-receta");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completa"),
    });
  });

  localStorage.setItem("tareas", JSON.stringify(todos));
}
