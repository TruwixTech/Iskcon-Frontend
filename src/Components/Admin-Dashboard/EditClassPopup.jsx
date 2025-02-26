import { useState, useEffect } from "react";
import axios from "axios";

const EditClassPopup = ({ classId, isOpen, onClose, refreshClasses }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timings: "",
    location: "",
    classesDays: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (classId && isOpen) {
      fetchClassDetails();
    }
  }, [classId, isOpen]);

  const fetchClassDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/offlineClasses/${classId}`
      );
      setFormData(response.data.data); // Ensure the backend returns all required fields
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch class details.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/offlineClasses/edit/${classId}`,
        formData
      );
      if (response.data.success) {
        // Refresh the class list
        onClose(); // Close the popup
        refreshClasses();
      } else {
        setError(response.data.message || "Failed to update class.");
      }
    } catch (err) {
      console.error("Error updating class:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update class.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white border-2 border-orange-500 p-6 rounded-3xl shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-prata font-bold mb-4">Edit Class</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-black font-prata font-bold">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-black font-prata font-bold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="block text-black font-prata font-bold">Timings</label>
              <input
                type="text"
                name="timings"
                value={formData.timings}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-black font-prata font-bold">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-black font-prata font-bold">Class Days</label>
              <input
                type="text"
                name="classesDays"
                value={formData.classesDays}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

           

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditClassPopup;