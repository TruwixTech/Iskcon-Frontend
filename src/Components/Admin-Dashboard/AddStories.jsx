import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backend = import.meta.env.VITE_BACKEND_URL;

function CreateStories() {
    const [preview, setPreview] = useState(null); // State for image preview
    const [stories, setStories] = useState([
        { title: '', description: '', type: '', media: null }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle changes in the input fields
    const handleInputChange = (index, field, value) => {
        const updatedStories = [...stories];
        updatedStories[index][field] = value;
        setStories(updatedStories);
    };

    // Handle file input (only one image)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result); // Set preview URL
                const updatedStories = [...stories];
                updatedStories[0].media = file; // Update the first story's media
                setStories(updatedStories);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        const story = stories[0]; // Use the first story in the array

        // Append story data to formData
        formData.append("title", story.title);
        formData.append("description", story.description);
        formData.append("type", story.type);

        if (story.media) {
            formData.append("media", story.media);
        }

        try {
            const response = await axios.post(`${backend}/admin/daily-story/create`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.status === 201) {
                toast.dismiss();
                toast.success("Daily story created successfully!");
                setStories([{ title: '', description: '', type: '', media: null }]); // Reset the form
                setPreview(null); // Reset preview
            } else {
                toast.dismiss();
                toast.error(response.data.message || "Failed to create daily story.");
            }
        } catch (error) {
            console.error("Error creating daily story:", error);
            toast.dismiss();
            toast.error("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-auto mt-10 flex flex-col justify-start items-center bg-[#fff4dc]">
            <div className="w-full h-auto rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex gap-6">
                    {/* Left Section */}
                    <div className="w-1/2">
                        <h2 className="text-2xl font-bold mb-2">Add Stories</h2>

                        <div className="border border-gray-300 rounded-xl p-4">
                            {/* Image Upload */}
                            <label htmlFor="images" className="cursor-pointer">
                                <div className="grid grid-cols-1 gap-2">
                                    {preview ? (
                                        <div className="h-40 bg-gray-200 rounded-lg border border-gray-300 flex justify-center items-center">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-40 bg-orange-100 rounded-lg border border-orange-400 flex justify-center items-center text-xl font-bold text-orange-500 cursor-pointer">
                                            + Upload Image
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2">
                        <div className="rounded-xl p-4">
                            {/* Buttons */}
                            <div className="flex justify-end gap-2 mb-4">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-orange-500 text-white px-4 py-1 rounded-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save"}
                                </button>
                            </div>

                            {/* Form Fields */}
                            <form className="space-y-4">
                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Event Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={stories[0].title}
                                        onChange={(e) => handleInputChange(0, 'title', e.target.value)}
                                        className="w-full border border-orange-300 rounded-lg p-2"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={stories[0].description}
                                        onChange={(e) => handleInputChange(0, 'description', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Event Type
                                    </label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={stories[0].type}
                                        onChange={(e) => handleInputChange(0, 'type', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateStories;