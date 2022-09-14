import { ChangeEvent, useState } from "react";
import { ToDoType } from "../App";
import trashIcon from "../assets/trash.svg";

type TodoProps = {
  toDo: ToDoType;
  handleDeleteToDo: (e: string) => void;
  handleCheckToDo: (e: ToDoType) => void;
};

export function ToDo({ toDo, handleDeleteToDo, handleCheckToDo }: TodoProps) {
  return (
    <li className={`wrapper ${toDo.check ? "checked" : ""}`} key={toDo.content}>
      <input
        type="checkbox"
        defaultChecked={toDo.check}
        onChange={() => handleCheckToDo(toDo)}
      />
      {!toDo.check ? <p>{toDo.content}</p> : <s>{toDo.content}</s>}
      <img
        src={trashIcon}
        alt=""
        onClick={() => handleDeleteToDo(toDo.content)}
      />
    </li>
  );
}
