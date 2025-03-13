import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = ({ user }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setFormData({ title: response.data.title, content: response.data.content });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(`http://127.0.0.1:8000/app/api/posts/${id}/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      navigate("/"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
