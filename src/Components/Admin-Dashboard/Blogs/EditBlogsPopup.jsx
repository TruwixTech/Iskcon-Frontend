import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditBlogsPopup = ({ blog, closePopup, refreshBlogs }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const [images, setImages] = useState([null]); // Single image by default
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddImage = () => {
        setImages([...images, null]); // Add a new null slot for another image
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
        data.append("title", formData.title);
        data.append("description", formData.content);
        const stringArray = images.filter(item => typeof item === 'string');
        data.append("previousImages", JSON.stringify(stringArray));

        images.forEach((image, index) => {
            if (image) data.append(`image`, image); // Append each image
        });

        try {
            const res = await axios.put(`${backend}/admin/blog/edit/${blog?._id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })


            if (res.status === 200 || res.status === 201) {
                alert("Blog updated successfully!");
                refreshBlogs();
                closePopup();
            }
        } catch (error) {
            console.error("Error saving blog:", error);
            setError(error?.response?.data?.message ?? "Failed to save blog");
        }
    };

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                content: blog.description,
            });
            setImages(blog.image); // Populate with existing images or a single null
        }
    }, [blog]);

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50 pt-20 font-marcellus">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {blog ? "Edit Blog" : "Create Blog"}
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
                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="5"
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
                            {blog ? "Save Changes" : "Create Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlogsPopup;
