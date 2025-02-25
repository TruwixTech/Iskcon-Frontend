import axios from 'axios';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import delete icon
import { FaPlus } from 'react-icons/fa'; // Import add icon

const backend = import.meta.env.VITE_BACKEND_URL;

function AddDonationComponent() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: [],
        startDate: '',
        endDate: '',
        // faqs: [],
        donationsCategory: []
    });
    const [previews, setPreviews] = useState([]); // Array to hold image previews

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]); // Append new previews
            setFormData({
                ...formData,
                image: [...formData.image, ...Array.from(e.target.files)],
            });
        }
    };

    const addCategory = () => {
        setFormData({
            ...formData,
            donationsCategory: [
                ...formData.donationsCategory,
                { title: "", donationTypes: [] },
            ],
        });
    };

    const deleteCategory = (index) => {
        const updatedCategories = formData.donationsCategory.filter(
            (_, i) => i !== index
        );
        setFormData({ ...formData, donationsCategory: updatedCategories });
    };

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...formData.donationsCategory];
        updatedCategories[index].title = value;
        setFormData({ ...formData, donationsCategory: updatedCategories });
    };

    const addDonationType = (categoryIndex) => {
        const updatedCategories = [...formData.donationsCategory];
        updatedCategories[categoryIndex].donationTypes.push({
            title: "",
            amount: "",
        });
        setFormData({ ...formData, donationsCategory: updatedCategories });
    };

    const deleteDonationType = (categoryIndex, typeIndex) => {
        const updatedCategories = [...formData.donationsCategory];
        updatedCategories[categoryIndex].donationTypes = updatedCategories[
            categoryIndex
        ].donationTypes.filter((_, i) => i !== typeIndex);
        setFormData({ ...formData, donationsCategory: updatedCategories });
    };

    const handleDonationTypeChange = (categoryIndex, typeIndex, field, value) => {
        const updatedCategories = [...formData.donationsCategory];
        updatedCategories[categoryIndex].donationTypes[typeIndex][field] = value;
        setFormData({ ...formData, donationsCategory: updatedCategories });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData1 = new FormData();
            formData1.append('title', formData.title);
            formData1.append('description', formData.description);
            formData1.append('startDate', formData.startDate);
            formData1.append('endDate', formData.endDate);

            formData.donationsCategory.forEach((category, categoryIndex) => {
                formData1.append(`donationsCategory[${categoryIndex}][title]`, category.title);
                category.donationTypes.forEach((type, typeIndex) => {
                    formData1.append(
                        `donationsCategory[${categoryIndex}][donationTypes][${typeIndex}][title]`,
                        type.title
                    );
                    formData1.append(
                        `donationsCategory[${categoryIndex}][donationTypes][${typeIndex}][amount]`,
                        type.amount
                    );
                });
            });

            formData.image.forEach((image, index) => {
                formData1.append(`image`, image); // Append each image
            });

            const response = await axios.post(`${backend}/admin/donation/create`, formData1);

            alert("Donation created successfully!");
            setFormData({
                title: "",
                description: "",
                image: [],
                startDate: '',
                endDate: '',
                donationsCategory: []
            })
            setPreviews([]);
            refreshDonations();
            onClose(); // Close the modal on form submission
        } catch (error) {
            console.error("Error saving donation:", error);
        }
    };

    const removeImage = (index) => {
        const updatedImages = formData.image.filter((_, i) => i !== index);
        setFormData({ ...formData, image: updatedImages });
    };

    return (
        <div className="w-full h-auto mt-10 flex flex-col justify-start items-center bg-[#fff4dc]">
            <div className="w-full h-auto rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex gap-6">
                    {/* Left Section */}
                    <div className="w-1/2">
                        <h2 className="text-2xl font-semibold mb-2">Add Donation</h2>

                        <div className="border border-gray-300 rounded-xl p-4">
                            {/* Image Upload */}
                            <label htmlFor="images" className="cursor-pointer">
                                <div className="grid grid-cols-3 gap-2">
                                    {previews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="h-40 bg-gray-200 rounded-lg border border-gray-300 flex justify-center items-center"
                                        >
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                    {previews.length < 6 && (
                                        <div className="h-40 bg-orange-100 rounded-lg border border-orange-400 flex justify-center items-center text-xl font-bold text-orange-500 cursor-pointer">
                                            +
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                className="hidden"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 overflow-y-scroll h-[400px]">
                        <div className="rounded-xl p-4">
                            {/* Buttons */}
                            <div className="flex justify-end gap-2 mb-4">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-orange-500 text-white px-4 py-1 rounded-lg"
                                >
                                    Save
                                </button>
                            </div>

                            {/* Form Fields */}
                            <form className="space-y-4">
                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full border border-orange-300 rounded-lg p-2"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Event Starts
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 cursor-pointer rounded-lg p-2"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Event Ends
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 cursor-pointer rounded-lg p-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-medium text-gray-700">Donation Categories</h3>
                                    {formData.donationsCategory.map((category, index) => (
                                        <div key={index} className="mb-4 border p-4 rounded">
                                            <div className="flex justify-between items-center">
                                                <input
                                                    type="text"
                                                    placeholder="Category Title"
                                                    value={category.title}
                                                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                                                    className="w-3/4 p-2 border rounded"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => deleteCategory(index)}
                                                    className="text-red-500"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>

                                            <div className="mt-4">
                                                <h4 className="font-medium text-gray-700">Donation Types</h4>
                                                {category.donationTypes.map((type, typeIndex) => (
                                                    <div key={typeIndex} className="flex items-center mb-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Donation Type Title"
                                                            value={type.title}
                                                            onChange={(e) =>
                                                                handleDonationTypeChange(
                                                                    index,
                                                                    typeIndex,
                                                                    "title",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-1/2 p-2 border rounded mr-2"
                                                            required
                                                        />
                                                        <input
                                                            type="number"
                                                            placeholder="Amount"
                                                            value={type.amount}
                                                            onChange={(e) =>
                                                                handleDonationTypeChange(
                                                                    index,
                                                                    typeIndex,
                                                                    "amount",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-1/3 p-2 border rounded mr-2"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteDonationType(index, typeIndex)}
                                                            className="text-red-500"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addDonationType(index)}
                                                    className="flex items-center text-blue-500 mt-2"
                                                >
                                                    <FaPlus className="mr-1" /> Add Donation Type
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addCategory}
                                        className="flex items-center text-blue-500 mt-4"
                                    >
                                        <FaPlus className="mr-1" /> Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDonationComponent;
