const form = document.querySelector(".js-toDoForm"),
  input = form.querySelector("input"),
  ul = document.querySelector(".js-toDoList");

const TODO_LS = "toDo",
  DELBTN = '<i class="far fa-times-circle"></i>';

let toDos = [];

function deleteToDo(event) {
  const btn = event.target.parentNode;
  const liToDelete = btn.parentNode;
  ul.removeChild(liToDelete);
  const cleanToDos = toDos.filter(function(toDo) {
    return parseInt(liToDelete.id) !== toDo.id;
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const newId = toDos.length + 1;
  const checkboxId = `checkbox${newId}`;
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const delBtn = document.createElement("button");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", checkboxId);
  label.setAttribute("for", checkboxId);
  label.innerText = text;
  delBtn.innerHTML = DELBTN;
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(delBtn);
  li.id = newId;
  ul.appendChild(li);

  const toDoObj = {
    todoTxt: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintToDo(currentValue);
  input.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.todoTxt);
    });
  }
}

function init() {
  loadToDos();
  form.addEventListener("submit", handleSubmit);
}

init();
