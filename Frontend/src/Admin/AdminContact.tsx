import { useEffect, useState, useCallback } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

const contactsURL = "http://localhost:5000/api/admin/contacts";

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch contacts with useCallback
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(contactsURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ("token"),
        },
      });
      const data = await res.json();

      if (res.ok) {
        setContacts(data || []);
      } else {
        setError(data.message || "Failed to load contacts");
      }
    } catch {
      setError("Error fetching contacts");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ Delete contact
  const deleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(`${contactsURL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: ("token"),
        },
      });

      if (res.ok) {
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Contacts</h1>

      {loading ? (
        <p className="text-gray-400">Loading contacts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-red-500 text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">{contact.name}</td>
                  <td className="p-3">{contact.email}</td>
                  <td className="p-3">{contact.message}</td>
                  <td className="p-3 text-gray-400 text-sm">
                    {new Date(contact.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex justify-center">
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-400">
                    No contacts found.
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

export default AdminContacts;
