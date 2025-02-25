import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditDonationsPopup = ({ donation, closePopup, refreshDonations }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const [images, setImages] = useState([]);
    const [donationsCategory, setDonationsCategory] = useState([]);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddImage = () => {
        setImages([...images, null]);
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

    const handleAddCategory = () => {
        setDonationsCategory([
            ...donationsCategory,
            { title: "", donationTypes: [] },
        ]);
    };

    const handleRemoveCategory = (index) => {
        const updatedCategories = donationsCategory.filter((_, i) => i !== index);
        setDonationsCategory(updatedCategories);
    };

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...donationsCategory];
        updatedCategories[index].title = value;
        setDonationsCategory(updatedCategories);
    };

    const handleAddDonationType = (categoryIndex) => {
        const updatedCategories = [...donationsCategory];
        updatedCategories[categoryIndex].donationTypes.push({
            title: "",
            amount: "",
        });
        setDonationsCategory(updatedCategories);
    };

    const handleRemoveDonationType = (categoryIndex, typeIndex) => {
        const updatedCategories = [...donationsCategory];
        updatedCategories[categoryIndex].donationTypes = updatedCategories[categoryIndex].donationTypes.filter(
            (_, i) => i !== typeIndex
        );
        setDonationsCategory(updatedCategories);
    };

    const handleDonationTypeChange = (categoryIndex, typeIndex, field, value) => {
        const updatedCategories = [...donationsCategory];
        updatedCategories[categoryIndex].donationTypes[typeIndex][field] = value;
        setDonationsCategory(updatedCategories);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if donationsCategory is not empty and all categories have a title and donation types
        const isValidCategory = donationsCategory.every(category => {
            return category.title && category.donationTypes.length > 0 && category.donationTypes.every(type => type.title && type.amount);
        });

        if (!isValidCategory) {
            setError("Please ensure all categories and donation types have titles and amounts.");
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("startDate", formData.startDate);
        data.append("endDate", formData.endDate);
        const stringArray = images.filter(item => typeof item === 'string');
        data.append("previousImages", JSON.stringify(stringArray));
        // Handle images
        images.forEach((image, index) => {
            if (image) {
                data.append(`image`, image); // Append each image with unique keys
            }
        });
        // Flatten donationsCategory to append each nested field with unique keys
        data.append("donationsCategory", JSON.stringify(donationsCategory));

        try {
            const res = await axios.put(`${backend}/admin/donation/edit/${donation?._id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200 || res.status === 201) {
                alert("Donation updated successfully!");
                refreshDonations();
                closePopup();
            }
        } catch (error) {
            console.error("Error saving donation:", error);
            setError(error?.response?.data?.message ?? "Failed to save donation");
        }
    };

    useEffect(() => {
        if (donation) {
            setFormData({
                title: donation.title,
                description: donation.description,
                startDate: donation.startDate?.split("T")[0] || "",
                endDate: donation.endDate?.split("T")[0] || "",
            });
            setImages(donation.image || []);
            setDonationsCategory(donation.donationsCategory || []);
        }
    }, [donation]);


    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center z-50 justify-center bg-gray-800 bg-opacity-50 pt-10 font-marcellus">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto relative z-50 border-2 border-[#f97316]" style={{
                scrollbarWidth: 'none'
            }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {donation ? "Edit Donation" : "Create Donation"}
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
                    {/* Start Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    {/* End Date */}
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
                    {/* Donations Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Donation Categories</label>
                        {donationsCategory.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-4 border-b pb-4">
                                <div className="flex items-center mb-2 space-x-2">
                                    <input
                                        type="text"
                                        value={category.title}
                                        onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                                        placeholder="Category Title"
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {donationsCategory.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCategory(categoryIndex)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Minus size={20} />
                                        </button>
                                    )}
                                </div>
                                <div className="ml-4">
                                    {category.donationTypes.map((type, typeIndex) => (
                                        <div key={typeIndex} className="flex items-center mb-2 space-x-2">
                                            <input
                                                type="text"
                                                value={type.title}
                                                onChange={(e) =>
                                                    handleDonationTypeChange(
                                                        categoryIndex,
                                                        typeIndex,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Donation Type"
                                                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <input
                                                type="number"
                                                value={type.amount}
                                                onChange={(e) =>
                                                    handleDonationTypeChange(
                                                        categoryIndex,
                                                        typeIndex,
                                                        "amount",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Amount"
                                                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveDonationType(categoryIndex, typeIndex)
                                                }
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Minus size={20} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddDonationType(categoryIndex)}
                                        className="mt-2 flex items-center text-green-500 hover:text-green-700"
                                    >
                                        <Plus size={20} className="mr-1" /> Add Donation Type
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className="mt-2 flex items-center text-green-500 hover:text-green-700"
                        >
                            <Plus size={20} className="mr-1" /> Add Category
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
                            {donation ? "Save Changes" : "Create Donation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDonationsPopup;
