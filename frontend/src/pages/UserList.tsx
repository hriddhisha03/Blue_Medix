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
  const handleView = (id: string) => alert(`Viewing user ${id}"`);
  const handleEdit = (id: string) => alert(`Editing user ${id}`);
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/api/users/delete-user/${id}`)
        .then(() => setUsers(users.filter(user => user._id !== id)))
        .catch(error => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-73px)] bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-center bg-blue-500 text-white py-3">User List</h2>
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700 sticky top-0">
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
                <tr key={user._id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">{user.role=="isAdmin"?"Admin":user.role=="isCustomer"?"Customer":"Seller"}</td>
                  <td className="p-3 flex justify-center gap-4">
                    <button onClick={() => navigate(`/users/${user._id}`)} >
                      <Eye size={30} color ="green" />
                    </button>
                    <button onClick={() => navigate(`/edit-user/${user._id}`)}>
                      <Pencil size={30} color ="orange" />
                    </button>
                    <button onClick={() => handleDelete(user._id)}>
                      <Trash2 size={30} color ="red" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">No users found</td>
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