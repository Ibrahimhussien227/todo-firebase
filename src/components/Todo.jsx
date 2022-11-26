import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import TodoForm from "./TodoForm";

const Todo = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    date: "",
  });

  const sumbitEdit = (value, date) => {
    editTodo(edit.id, value, date);
    setEdit({
      id: null,
      value: "",
      date: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSumbit={sumbitEdit} />;
  }

  return (
    <ul>
      {todos.map((todo, i) => (
        <li
          key={i}
          className={`flex justify-between p-4 my-2 capitalize ${
            todo.completed ? "bg-slate-400" : "bg-slate-200"
          }`}
        >
          <div className="flex">
            <input
              onChange={() => toggleComplete(todo)}
              type="checkbox"
              checked={todo.completed ? "checked" : ""}
            />
            <div onClick={() => toggleComplete(todo)} className="ml-4">
              <p
                className={`cursor-pointer ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.text}
              </p>
              <p
                className={`${
                  todo.completed ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {todo?.end_at?.toDate()?.toDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <a
              className="cursor-pointer flex items-center"
              href={todo.downloadUrl}
            >
              <AiOutlineDownload />
            </a>

            <button
              onClick={() =>
                setEdit({ id: todo.id, value: todo.text, date: todo.end_at })
              }
              className="cursor-pointer flex items-center"
              type="button"
            >
              <FiEdit2 />
            </button>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="cursor-pointer flex items-center"
              type="button"
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Todo;
