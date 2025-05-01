import React, { useState } from "react";
import "./Signin.scss";

const Signin = ({ setCurrentPage, setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
      alert("User not found. Please sign up.");
      return;
    }

    if (users[email].password !== password) {
      alert("Incorrect password.");
      return;
    }

    setCurrentUser(users[email]);
    localStorage.setItem("currentUserEmail", email);
    alert("Signin successful!");
    setCurrentPage("dashboard");

  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSignin} className="signin-form">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
