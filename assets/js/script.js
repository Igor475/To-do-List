const list = document.querySelector("ul");
const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const editButton = document.querySelector(".edit-button");

/* Funcão para salvar as tarefas */
function saveTasks() {
  /* Pegando todas as div's (Ou seja, todas as tarefas das classes .flex-items) e criando 
  um Array com os textos destas tarefas */
  const tasks = [...document.querySelectorAll('.flex-items')].map((div) => {
    return {
      text: div.querySelector("li").textContent, // Pegando o texto da tarefa
      checked: div.querySelector(".checkbox-task").checked, // Pegando o estado do checkbox
    };
  });

  /* Convertendo para JSON e salvando no localstorage */
  localStorage.setItem("Tasks", JSON.stringify(tasks));
}

/* Função para carregar as tarefas */
function loadTasks() {
  /* Pegando as tarefas salvas no localstorage. Se caso não houver tarefas salvas,
  utilizo [] (um array vazio), só para evitar erros */
  const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  /* Para cada tarefa salva, chamamos createTaskElement(task) para adicioná-la na tela */
  tasks.forEach((task) => createTaskElement(task.text, task.checked));
}

/* Função para criar as tarefas */
function createTaskElement(taskText, isChecked = false) {
  /* Criando uma <div> para agrupar as tarefas e os botões */
  const div = document.createElement("div");
  div.className = "flex-items";

  const checkboxTask = document.createElement("input");
  checkboxTask.type = "checkbox";
  checkboxTask.className = "checkbox-task";
  checkboxTask.checked = isChecked; // Definindo o estado salvo do checkbox

  /* Criamos um <li> (a própria tarefa) e colocamos o texto que foi passado */
  const newLi = document.createElement("li");
  newLi.textContent = taskText;

  if(isChecked) {
    div.classList.add("active");
  }

  /* Criando um botão de editar com um ícone de lápis */
  const editButton = document.createElement("button");
  editButton.className = "btn-edit";
  editButton.innerHTML = "<i class='bi bi-pencil'></i>";

  checkboxTask.addEventListener("change", () => {
    if (checkboxTask.checked) {
      div.classList.add("active");
      saveTasks();
    } else {
      div.classList.remove("active");
      saveTasks();
    }
  });

  /* Quando o usuário clicar no botão, aparece uma caixa de diálogo (prompt) para editar o texto */
  editButton.addEventListener("click", () => {
    const newText = prompt("Edite sua tarefa:", newLi.textContent);
    /* Se o usuário inserir um novo texto (e se ele não for vazio), atualizamos a <li> */
    if (newText !== null && newText.trim() !== "") {
      /* Atualizando a <li> e chamando o saveTask() para salvar a edição no localstorage */
      newLi.textContent = newText;
      saveTasks();
    }
  });

  /* Criando um botão de remoção com um ícone de X */
  const btnRemove = document.createElement("button");
  btnRemove.className = "btn-remove";
  btnRemove.innerHTML = "<i class='bi bi-x-lg'></i>";

  /* Quando o usuário clica no botão, removemos a tarefa da tela */
  btnRemove.addEventListener("click", () => {
    /* Removendo a tarefa que está contida na <div> e chamando o saveTask() 
    para atualizar o localstorage */
    div.remove();
    saveTasks();
  });

  /* Adicionamos o <li> (tarefa) dentro da <div>.
  Adicionamos os botões de editar e remover dentro do <div>.
  Adicinamos o <div> inteiro dentro da <ul> (a lista de tarefas) */
  div.appendChild(checkboxTask);
  div.appendChild(newLi);
  div.appendChild(editButton);
  div.appendChild(btnRemove);
  list.appendChild(div);
}

/* Função para adicionar as tarefas */
function addTask() {
  /* Pegamos o que o usuário digitou no input.
  Se o usuário não digitou nada (apenas espaços em branco), não adicionamos nada. */
  if (input.value.trim() === "") {
    return;
  }

  /* Criando a tarefa chamando o createTaskElement(input.value). Salvamos a tarefa no localstorage.
  e limpamos o campo input para que o usuário possa digitar outra tarefa. */
  createTaskElement(input.value);
  saveTasks(); // Salva as tarefas no localStorage
  input.value = ""; // Limpa o campo de input
}

/* Função para adicionar as tarefas pelo teclado - tecla "Enter" */
function addTaskInput(e) {
  if (e.key === "Enter") {
    addTask();
  }
}

// Chamando a funcão loadTasks() para mostrar as tarefas salvas no localstorage
loadTasks();

addButton.addEventListener("click", addTask);
input.addEventListener("keyup", addTaskInput);
