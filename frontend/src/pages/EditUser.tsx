import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  role: string;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>(); // Get user ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    _id: "",
    name: "",
    email: "",
    gender: "male",
    role: "user",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/users/${id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load user data.");
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/update-user/${id}`, formData);
      alert("User updated successfully!");
      navigate(-1); // Redirect to user details page
    } catch (error) {
      setError("Failed to update user.");
    }
  };

  if (loading) return <p className="text-center text-white">Loading user details...</p>;
  if (error) return <p className="text-white text-center">{error}</p>;

  return (
    <div className="h-[calc(100vh-78px)] flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-white border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center p-3 rounded-lg mb-6">
          Edit User
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border p-2 rounded text-white placeholder-gray-300"
            placeholder="Enter name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border p-2 rounded text-white placeholder-gray-300"
            placeholder="Enter email"
            required
          />
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-transparent border p-2 rounded text-white" required>
            <option value="male" className="text-black">Male</option>
            <option value="female" className="text-black">Female</option>
          </select>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-transparent border p-2 rounded text-white" required>
            <option value="isCustomer" className="text-black">Customer</option>
            <option value="isAdmin" className="text-black">Admin</option>
            <option value="isSeller" className="text-black">Seller</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
