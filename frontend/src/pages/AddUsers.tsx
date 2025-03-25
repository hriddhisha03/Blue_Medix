import { useState } from "react";
import axios from "axios";

type UserFormData = {
  name: string;
  gender: "male" | "female" | "other";
  age: number;
  email: string;
  password: string;
  role: "isSeller" | "isAdmin" | "isCustomer";
};

const Register = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    gender: "male",
    age: 18,
    email: "",
    password: "",
    role: "isCustomer",
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [message, setMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.age < 1) newErrors.age = 0;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-[calc(100vh-73px)] max-w-md mx-125 mt-1 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="isCustomer">Customer</option>
            <option value="isSeller">Seller</option>
            <option value="isAdmin">Admin</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
