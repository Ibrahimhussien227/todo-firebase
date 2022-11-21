import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import TodoForm from "./TodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, []);

  // Create Todo
  const addTodo = async (input, day) => {
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }

    await addDoc(collection(db, "todos"), {
      text: input,
      created_at: serverTimestamp(),
      end_at: Timestamp.fromDate(day),
      completed: false,
    });
  };

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Edit todo
  const editTodo = async (id, value, date) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? value : item)));

    await updateDoc(doc(db, "todos", id), {
      text: value,
      end_at: Timestamp.fromDate(date),
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="bg-slate-100 max-w-[500] w-full m-auto rounded-md shadow-xl p-4">
      <h3 className="text-3xl font-bold text-center text-gray-800 p-2">
        Todo App
      </h3>
      <TodoForm onSumbit={addTodo} />

      <Todo
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />

      {todos.length > 1 ? (
        <p className="text-center p-2">You have {todos.length} todos</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default TodoList;
