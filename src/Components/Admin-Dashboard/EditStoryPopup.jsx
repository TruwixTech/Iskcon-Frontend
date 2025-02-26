import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditStoryPopup = ({ story, onClose, onUpdate }) => {
    const [title, setTitle] = useState(story.title);
    const [description, setDescription] = useState(story.description);
    const [type, setType] = useState(story.type);
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(story.media);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!media) return;
        const objectUrl = URL.createObjectURL(media);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [media]);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setMedia(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", type);
        if (media) formData.append("media", media);

        try {
            const response = await axios.put(`${backend}/admin/daily-story/update/${story._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                toast.success("Story updated successfully!");
                // onUpdate(response.data.data);
                onClose();
            
            } else {
                toast.error(response.data.message || "Failed to update story.");
            }
        } catch (error) {
            console.error("Error updating story:", error);
            toast.error("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white border-2 border-orange-500 p-6 rounded-3xl w-full max-w-4xl">
                <h2 className="text-2xl font-prata font-bold mb-4">Edit Story</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-bold font-prata mb-2">Title</label>
                        <input 
                            type="text" 
                            className="w-full border rounded p-2" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-bold font-prata mb-2">Description</label>
                        <textarea 
                            className="w-full border rounded p-2" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-bold font-prata mb-2">Type</label>
                        <select 
                            className="w-full border rounded p-2" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-bold font-prata mb-2">Upload Media</label>
                        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
                        {preview && (
                            <div className="mt-2">
                                {type === "image" ? (
                                    <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded" />
                                ) : (
                                    <video src={preview} controls className="w-full h-40 object-cover rounded"></video>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" className="px-8 py-2 bg-gray-400 text-white rounded-xl" onClick={onClose}>Cancel</button>
                        <button type="submit" className="px-8 py-2 bg-orange-500 text-white rounded-xl" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStoryPopup;