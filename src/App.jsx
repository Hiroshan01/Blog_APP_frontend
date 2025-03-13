import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/app/api/user/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch((error) => console.error(error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
