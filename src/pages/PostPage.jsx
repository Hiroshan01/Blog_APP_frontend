import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`http://127.0.0.1:8000/app/api/posts/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.put(
        `http://127.0.0.1:8000/app/api/posts/${id}/`,
        {
          title,
          content,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://127.0.0.1:8000/app/api/posts/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Edit Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows="6"
      />
      <div className="flex justify-between">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostPage;
