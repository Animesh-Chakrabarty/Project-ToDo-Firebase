/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import "./Todo.scss";
import {
  arrayRemove,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const Todo = ({ todo }) => {
  const [todoList, setTodoList] = useState([]);

  const fetchTodosFromDB = async () => {
    const unsub = await onSnapshot(
      doc(db, "todos", auth?.currentUser?.uid),
      (doc) => {
        setTodoList(doc.data().todoList);
      }
    );

    return () => {
      unsub();
    };
  };

  useEffect(() => fetchTodosFromDB, [auth?.currentUser?.uid]);
  console.log(todoList);

  const deleteTodoFromDB = (id) => {
    updateDoc(doc(db, "todos", auth?.currentUser?.uid), {
      todoList: arrayRemove(todo),
    });
  };

  const toggleIsCompleted = (id) => {
    updateDoc(doc(db, "todos", auth?.currentUser?.uid), {
      todoList: todoList.map((_todo) =>
        _todo.id === id ? { ..._todo, isCompleted: !todo.isCompleted } : _todo
      ),
    });
  };

  return (
    <li className="li">
      <div className="row">
        {todo.isCompleted ? (
          <input
            type="checkbox"
            onClick={() => toggleIsCompleted(todo.id)}
            checked
          />
        ) : (
          <input type="checkbox" onClick={() => toggleIsCompleted(todo.id)} />
        )}

        {todo.isCompleted ? (
          <p className="text task-completed">{todo.task}</p>
        ) : (
          <p className="text">{todo.task}</p>
        )}
      </div>
      <button onClick={() => deleteTodoFromDB(todo.id)}>
        <MdDeleteOutline size={26} />{" "}
      </button>
    </li>
  );
};

export default Todo;
