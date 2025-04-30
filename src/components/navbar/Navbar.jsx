import React from 'react'
import "./Navbar.scss"

const Navbar = ({currentPage, setCurrentPage, currentUser, setCurrentUser}) => {

    const handleLogout = () => {
        setCurrentPage("signin")
        setCurrentUser(null)
    }
  return (
    <nav className='navbar'>
      <div >
        <h2 >Tasking</h2>
      </div>

      <div>
        {currentUser && <p>Hello, {currentUser.name}</p>}
      </div>

      <div >
        {currentUser ? (
          <>
            <button  onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
            <button  onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button  onClick={() => setCurrentPage("signin")}>Signin</button>
            <button  onClick={() => setCurrentPage("signup")}>Signup</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar