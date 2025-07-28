import { useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  approved: boolean;
}

const userURL = "http://localhost:5000/api/admin/users";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(userURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ("token"),
        },
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Approve user API call
  // const approveUser = async (id: string) => {
  //   try {
  //     const response = await fetch(`${userURL}/approve/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  //       },
  //       body: JSON.stringify({ approved: true }),
  //     });

  //     if (response.ok) {
  //       setUsers((prev) =>
  //         prev.map((u) => (u._id === id ? { ...u, approved: true } : u))
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error approving user:", error);
  //   }
  // };

  // ✅ Delete user API call
  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/:id`, {
        method: "DELETE",
        headers: {
          Authorization: ("token"),
        },
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {loading ? (
        <p className="text-gray-400">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-red-500 text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {user.approved ? (
                      <span className="text-green-400 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-red-400 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                   
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
