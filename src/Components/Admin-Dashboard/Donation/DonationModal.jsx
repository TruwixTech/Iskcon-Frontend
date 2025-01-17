import axios from 'axios';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import delete icon
import { FaPlus } from 'react-icons/fa'; // Import add icon
import Modal from 'react-modal'; // Import modal

const backend = import.meta.env.VITE_BACKEND_URL;

const CreateDonationForm = ({ onClose , refreshDonations }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: [],
    startDate: '',
    endDate: '',
    // faqs: [],
    donationsCategory: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: [...formData.image, ...Array.from(e.target.files)],
    });
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
      formData.donationsCategory.forEach((category) => {
        formData1.append('donationsCategory.title', category.title);
        category.donationTypes.forEach((type) => {
          formData1.append('donationsCategory.donationTypes.title', type.title);
          formData1.append('donationsCategory.donationTypes.amount', type.amount);
        });
      });

      formData.image.forEach((image, index) => {
        formData1.append(`image`, image); // Append each image
      });

      const response = await axios.post(`${backend}/admin/donation/create`, formData1);

      alert("Donation created successfully!");
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
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-gray-800 bg-opacity-50 font-marcellus">
      <div
        className="p-6 bg-white rounded shadow-md w-3/4 max-w-3xl h-[650px] mx-auto overflow-y-auto "
        // className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full"
              multiple
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.image.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <span className="text-sm">{img.name}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endDate" className="block font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
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
                        className="w-1/3 p-2 border rounded mr-2"
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

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default CreateDonationForm;
