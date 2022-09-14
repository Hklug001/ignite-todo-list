import "./App.css";
import toDoLogo from "./assets/Logo.svg";
import createPlus from "./assets/plus.svg";
import clipboard from "./assets/Clipboard.svg";

import { ToDo } from "./components/todo";
import { FormEvent, useState } from "react";

export type ToDoType = {
  content: string;
  check: boolean;
};

export function App() {
  const [newToDoContent, setNewToDoContent] = useState<string>("");
  const [toDoList, setToDoList] = useState<ToDoType[]>([]);

  const handleNewToDo = (event: FormEvent) => {
    event.preventDefault();
    let newToDo = {
      content: newToDoContent,
      check: false,
    } as ToDoType;
    if (!toDoList.includes(newToDo)) setToDoList([newToDo, ...toDoList]);
    else alert("Conteúdo já existente");
  };

  const handleDeleteToDo = (content: string) => {
    setToDoList(toDoList.filter((toDo) => toDo.content != content));
  };

  const handleCheckToDo = (toDo: ToDoType) => {
    let updateToDo = {
      ...toDo,
      check: !toDo.check,
    };
    let updateToDoList = toDoList.filter((toDoElement) => toDoElement != toDo);

    if (updateToDo.check) {
      setToDoList([...updateToDoList, updateToDo]);
    } else {
      setToDoList([updateToDo, ...updateToDoList]);
    }
  };

  return (
    <div className="App">
      <header className="wrapper">
        <img src={toDoLogo} alt="" />
      </header>
      <main className="wrapper">
        <form id="toDo-input-section" className="wrapper">
          <input
            type="text"
            id="toDo-input"
            placeholder="Adicione uma nova tarefa"
            onChange={(event) => setNewToDoContent(event.currentTarget.value)}
          />
          <button
            id="create-button"
            className="wrapper"
            onClick={handleNewToDo}
          >
            <span id="create-span">Criar</span>
            <img src={createPlus} alt="" />
          </button>
        </form>
        <section id="toDo-list-section" className="wrapper">
          <div id="toDo-info" className="wrapper">
            <div>
              <span id="created-tasks-span">Tarefas Criadas </span>
              <span className="toDo-info-number">{toDoList.length}</span>
            </div>
            <div>
              <span id="concluded-tasks-span">Concluídas </span>
              <span className="toDo-info-number">
                {toDoList.filter((toDo) => toDo.check == true).length} de{" "}
                {toDoList.length}
              </span>
            </div>
          </div>
          {toDoList.length != 0 ? (
            <ul>
              {toDoList.map((toDo) => (
                <ToDo
                  toDo={toDo}
                  handleDeleteToDo={handleDeleteToDo}
                  handleCheckToDo={handleCheckToDo}
                />
              ))}
            </ul>
          ) : (
            <div id="todo-list-empty" className="wrapper">
              <img src={clipboard} alt="" />
              <span>Você ainda não tem tarefas cadastradas</span>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
