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

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [message, setMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters and spaces";
    }

    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.age < 18) newErrors.age = "You must be at least 18 years old";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage(response.data.message);
    } catch (error: any) {
      setErrors({ email: error.response?.data?.message || "Registration failed" });
    }
  };

  return (
    <div className="h-[calc(100vh-78px)] flex justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-2">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-5 w-full max-w-lg text-white border border-white/30">
        <h2 className="text-3xl font-bold text-white mb-4">User Registration</h2>
        
        {message && <p className="mb-4 text-green-300">{message}</p>}
        {errors.email && <p className="mb-4 text-red-400">{errors.email}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border p-2 rounded text-white placeholder-gray-300"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-800">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium text-white">Gender</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              className="w-full bg-transparent border p-2 rounded text-white"
            >
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-white">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-transparent border p-2 rounded text-white placeholder-gray-300"
            />
            {errors.age && <p className="text-red-800">{errors.age}</p>}
          </div>

          <div>
            <label className="block font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border p-2 rounded text-white placeholder-gray-300"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-800">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border p-2 rounded text-white placeholder-gray-300"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-800">{errors.password}</p>}
          </div>

          <div>
            <label className="block font-medium text-white">Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              className="w-full bg-transparent border p-2 rounded text-white"
            >
              <option value="isCustomer" className="text-black">Customer</option>
              <option value="isSeller" className="text-black">Seller</option>
              <option value="isAdmin" className="text-black">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
