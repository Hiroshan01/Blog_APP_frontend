import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Track clicked post
  const navigate = useNavigate();

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

    axios
      .get("http://127.0.0.1:8000/app/api/posts/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://127.0.0.1:8000/app/api/posts/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== id));
      setSelectedPost(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostClick = (post) => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
    } else if (post.author.id === user.id) {
      setSelectedPost(post); // Show delete/update if it's the user's post
    }
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="container mx-auto p-4 bg-blue-100">
        <h1 className="text-2xl font-bold mb-4 text-center">Blog Posts</h1>
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 shadow rounded cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.content}</p>
              {selectedPost && selectedPost.id === post.id && (
                <div className="mt-2">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update-post/${post.id}`}
                    className="bg-blue-500 text-white p-2 rounded ml-2"
                  >
                    Update
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
