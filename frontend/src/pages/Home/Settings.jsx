import { useEffect, useState } from "react";
import API from "../../Axios/api";
import { toast } from "react-toastify";

function Settings() {
  const [user, setUser] = useState({ name: "", email: "", image: "" });
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ name: "", email: "", image: "" });

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/me");
        setUser(res.data.user);
        setTempUser(res.data.user); // For editing
      } catch {
        toast.error("Error fetching user");
      }
    };
    fetchUser();
  }, []);

  // Handlers
  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setTempUser(user); // Reset to original
  };
  const handleSave = async () => {
    const { name, email, image } = tempUser;
    if (!name || !email) return toast.error("Name and Email are required");

    try {
      const res = await API.patch("/settings/edit", { name, email, image });
      if (res.data.success) {
        setUser({ name, email, image });
        setEditMode(false);
        toast.success("Profile updated!");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Error saving changes");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-32 p-6 bg-transparent rounded-xl shadow-md text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-6 text-center">Account Settings</h1>

      <div className="flex flex-col items-center mb-6 text-[var(--text-color)]">
        <img
          src={tempUser.image || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <h4 className="text-gray-400 my-2">{user.email}</h4>
        {editMode && (
          <input
            type="text"
            placeholder="Image URL"
            className="mt-2 p-2 w-full border rounded"
            value={tempUser.image}
            onChange={(e) => setTempUser({ ...tempUser, image: e.target.value })}
          />
        )}
      </div>

      <div className="grid gap-4 ">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          {editMode ? (
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={tempUser.name}
              onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
            />
          ) : (
            <div className="p-2 border rounded bg-transparent text-[var(--text-color)]">{user.name}</div>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          {editMode ? (
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={tempUser.email}
              onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
            />
          ) : (
            <div className="p-2 border rounded bg-transparent text-[var(--text-color)]">{user.email}</div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {!editMode ? (
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Settings;
