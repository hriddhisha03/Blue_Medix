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

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
