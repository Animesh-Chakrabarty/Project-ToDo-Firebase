import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import './Login.scss'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  };

  return (
    <div className="login">
      <div className="container">
        <p className="signIn">Sign In</p>
        <form onSubmit={signIn}>
          <input
            type="email"
            placeholder="user@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="pass123..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Sign In</button>
        </form>
        <p>
          Don't have account? <Link to={'/register'}>Sign Up </Link>instead
        </p>
      </div>
    </div>
  );
};

export default Login;
