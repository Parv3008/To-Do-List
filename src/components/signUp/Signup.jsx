import React, { useState, useId } from "react";
import "./Signup.scss";

const Signup = ({ setCurrentPage }) => {
  const Id = useId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.find((user) => user.email === formData.email)) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      ...formData,
      id: Id, 
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("User registered successfully!");
    setCurrentPage("signin");
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="name" placeholder="Name" onChange={handleChange} className="form-input" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="form-input" required />
        <input name="mobile" type="tel" placeholder="Mobile No" onChange={handleChange} className="form-input" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-input" required />
        <input name="dob" type="date" onChange={handleChange} className="form-input" required />
        <div className="radio">
          Gender:
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} />
            Female
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
