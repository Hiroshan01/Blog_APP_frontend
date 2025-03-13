import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  console.log(user)
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold">Home</Link>
        
        <div className="flex gap-4">
          {user ? (
            <>
              <Link to="/create-post" className="text-white">Create Post</Link>
              <span className="text-white">Welcome, {user.username}</span>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
