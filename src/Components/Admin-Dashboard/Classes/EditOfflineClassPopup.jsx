import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditOfflineClassPopup = ({ classData, closePopup, refreshClasses }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        timings: "",
        location: "",
        classesDays: "",
    });

    const [images, setImages] = useState([null]); // Initial empty image array
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddImage = () => {
        setImages([...images, null]); // Add a new slot for another image
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleImageChange = (index, file) => {
        const updatedImages = [...images];
        updatedImages[index] = file;
        setImages(updatedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));

        images.forEach((image, index) => {
            if (image) data.append(`image`, image); // Use `image` to match schema
        });

        try {
            const url = classData
                ? `${backend}/api/v1/classes/update/${classData._id}`
                : `${backend}/api/v1/classes/create`;

            const method = classData ? "put" : "post";

            const res = await axios({
                method,
                url,
                data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200 || res.status === 201) {
                alert(classData ? "Class updated successfully!" : "Class created successfully!");
                refreshClasses();
                closePopup();
            }
        } catch (error) {
            console.error("Error saving class:", error);
            setError(error?.response?.data?.message ?? "Failed to save class");
        }
    };

    useEffect(() => {
        if (classData) {
            setFormData({
                title: classData.title || "",
                description: classData.description || "",
                timings: classData.timings || "",
                location: classData.location || "",
                classesDays: classData.classesDays || "",
            });
            setImages(classData.image || [null]); // Populate with existing images
        }
    }, [classData]);

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50 pt-20 font-marcellus">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {classData ? "Edit Offline Class" : "Create Offline Class"}
                    </h2>
                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="5"
                            required
                        />
                    </div>
                    {/* Timings */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timings</label>
                        <input
                            type="text"
                            name="timings"
                            value={formData.timings}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Classes Days */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class Days</label>
                        <input
                            type="text"
                            name="classesDays"
                            value={formData.classesDays}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                        {images.map((image, index) => (
                            <div key={index} className="flex items-center mb-2 space-x-2">
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                                    className="flex-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Minus size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="mt-2 flex items-center text-green-500 hover:text-green-700"
                        >
                            <Plus size={20} className="mr-1" /> Add Image
                        </button>
                    </div>
                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={closePopup}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            {classData ? "Save Changes" : "Create Class"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOfflineClassPopup;
