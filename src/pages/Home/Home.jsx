/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import "./Home.scss";
import { AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import Todo from "../../components/Todo/Todo";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

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

  const addTodoToDB = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "todos", auth?.currentUser?.uid), {
      todoList: arrayUnion({
        task: newTodo,
        isCompleted: false,
        id: todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1,
      }),
    });
    setNewTodo("");
  };

  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };

  console.log(todoList);

  return (
    <div className="home">
      <div className="container">
        <div className="header">
          <div className="logo">ToDoGo</div>
          <button onClick={logOut}>Log Out</button>
        </div>
        <form onSubmit={addTodoToDB}>
          <input
            type="text"
            placeholder="Add Task..."
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button>
            <AiFillPlusCircle size={30} />
          </button>
        </form>
        <ul>
          {todoList &&
            todoList.map((todo) => <Todo todo={todo} key={todo.id} />)}
        </ul>
      </div>
    </div>
  );
};

export default Home;
