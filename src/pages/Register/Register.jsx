/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    createDocInUsers();
    createDocInTodos();
    navigate("/");
  };

  const createDocInUsers = async () => {
    await setDoc(doc(db, "users", auth?.currentUser?.uid), {
      username,
      email,
      uid: auth?.currentUser?.uid,
    });
  };

  const createDocInTodos = async () => {
    await setDoc(doc(db, "todos", auth?.currentUser?.uid), {
      todoList: [],
    });
  };

  const logOut = () => {
    signOut(auth);
  };

  console.log(auth?.currentUser);

  return (
    <div className="register">
      <div className="container">
        <p className="signUp">ToDoGo</p>
        <form onSubmit={createUser}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="user@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password123..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link> instead
        </p>
      </div>
    </div>
  );
};

export default Register;
