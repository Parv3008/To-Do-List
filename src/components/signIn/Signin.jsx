import React, { useState } from "react";
import "./Signin.scss";

const Signin = ({ setCurrentPage, setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      alert("User not found. Please sign up.");
      return;
    }

    if (foundUser.password !== password) {
      alert("Incorrect password.");
      return;
    }

    setCurrentUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser)); // store entire object
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
