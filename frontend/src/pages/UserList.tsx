import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  role: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/api/users/delete-user/${id}`)
        .then(() => setUsers(users.filter(user => user._id !== id)))
        .catch(error => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-78px)] bg-gradient-to-r from-blue-500 to-purple-600 p-6">
  <div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/30">
  
    <h2 className="text-2xl font-semibold text-center py-3 bg-gray-100 shadow-stone-600">
      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        User List
      </span>
    </h2>

    <div className="overflow-auto max-h-[400px]">
      <table className="w-full border-collapse text-white">
        <thead className="bg-white/1 text-white sticky top-0 backdrop-blur-lg">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b border-white/20">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.gender=== "female" ? "Female" : user.gender==='male' ? "Male" : "Other"}</td>
              <td className="p-3">
                {user.role === "isAdmin" ? "Admin" : user.role === "isCustomer" ? "Customer" : "Seller"}
              </td>
              <td className="p-3 flex justify-center gap-4">
                <button onClick={() => navigate(`/users/${user._id}`)}>
                  <Eye size={30} className="text-white" />
                </button>
                <button onClick={() => navigate(`/edit-user/${user._id}`)}>
                  <Pencil size={30} className="text-yellow-300" />
                </button>
                <button onClick={() => handleDelete(user._id)}>
                  <Trash2 size={30} className="text-red-400" />
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="p-3 text-center text-gray-300">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


  );
};

export default UserList;