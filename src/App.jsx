import { useEffect, useState } from "react";
import "./App.css";
import Signup from "./components/signUp/Signup";
import Signin from "./components/signIn/Signin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("signin");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
      setCurrentPage("dashboard");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
      {currentPage === "signin" && (
        <Signin
          setCurrentPage={setCurrentPage}
          setCurrentUser={setCurrentUser}
        />
      )}
      {currentPage === "dashboard" && currentUser && (
        <Dashboard currentUser={currentUser} />
      )}

      <Footer />
    </>
  );
}

export default App;
