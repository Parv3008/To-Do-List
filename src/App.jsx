import { useState } from "react";
import "./App.css";
import Signup from "./components/signUp/Signup";
import Signin from "./components/signIn/Signin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("signin");
  const [currentUser, setCurrentUser] = useState(null);

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
      <Footer/>
    </>
  );
}

export default App;
