const $add = document.querySelector("#todo-add-button");
const $input = document.querySelector("#new-todo");
const $list = document.querySelector(".todo-list");
let todos = [];
let idCounter = todos.length;

if (localStorage.todos) {
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((item) => {
    render(item);
    idCounter++;
  });
  if (localStorage.showHide === "true") {
    $list.classList.add("hide-done");
  }
}

const $showHide = document.querySelector("#show-hide-button");

$showHide.addEventListener("click", function () {
  let showHide = false;
  if ($list.classList.contains("hide-done")) {
    $list.classList.remove("hide-done");
    localStorage.setItem("showHide", showHide);
  } else {
    $list.classList.add("hide-done");
    showHide = true;
    localStorage.setItem("showHide", showHide);
  }
});

function toLocalStorage(todos) {
  const todosString = JSON.stringify(todos);
  localStorage.setItem("todos", todosString);
}

function render(task) {
  const $li = document.createElement("li");

  const $div = document.createElement("div");
  $div.classList.add("buttons");

  const $done = document.createElement("button");
  $done.textContent = "done";
  $done.classList.add("done");
  $div.appendChild($done);

  const $delete = document.createElement("button");
  $delete.textContent = "delete";
  $delete.classList.add("delete");
  $div.appendChild($delete);

  $li.textContent = task.text;

  $li.dataset.id = task.id;

  $input.value = "";
  $li.appendChild($div);

  if (task.isDone) {
    $li.classList.add("done-item");
  }

  $list.appendChild($li);
}

$add.addEventListener("click", function () {
  const text = $input.value;
  idCounter++;

  const task = {
    id: idCounter,
    text,
    isDone: false,
  };
  todos.push(task);

  render(task);

  toLocalStorage(todos);
});

$list.addEventListener("click", (e) => {
  if (e.target.className === "done") {
    let currentTodo = todos.find(
      (elem) => elem.id == e.target.closest("li").dataset.id
    );

    if (e.target.closest("li").classList.contains("done-item")) {
      e.target.closest("li").classList.remove("done-item");
      currentTodo.isDone = false;

      toLocalStorage(todos);
    } else {
      e.target.closest("li").classList.add("done-item");
      currentTodo.isDone = true;

      toLocalStorage(todos);
    }
  } else if (e.target.className === "delete") {
    e.target.closest("li").remove();
    const currentTodoIndex = todos.findIndex(
      (elem) => elem.id == e.target.closest("li").dataset.id
    );
    todos.splice(currentTodoIndex, 1);

    toLocalStorage(todos);
  }
});
