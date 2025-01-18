import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const CreateProductPopup = ({ product, closePopup, refreshProducts }) => {
    const [formData, setFormData] = useState({
        name: "",
        productId: "",
        description: "",
        subDesc: "", // Added subDesc field
        category: "",
        stock: 0,
        price: 0,
        images: [null], // Start with one empty image slot
        sizes: [], // Added sizes field
    });

    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddImage = () => {
        setFormData({
            ...formData,
            images: [...formData.images, null],
        });
    };

    const handleRemoveImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
    };

    const handleImageChange = (index, file) => {
        const updatedImages = [...formData.images];
        updatedImages[index] = file;
        setFormData({ ...formData, images: updatedImages });
    };

    const handleAddSize = () => {
        setFormData({
            ...formData,
            sizes: [...formData.sizes, { sizeType: "", amount: 0 }],
        });
    };

    const handleRemoveSize = (index) => {
        const updatedSizes = formData.sizes.filter((_, i) => i !== index);
        setFormData({ ...formData, sizes: updatedSizes });
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...formData.sizes];
        updatedSizes[index][field] = value;
        setFormData({ ...formData, sizes: updatedSizes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("productId", formData.productId || ""); // Use UUID generated in backend if needed
        data.append("description", formData.description);
        data.append("subDesc", formData.subDesc); // Include subDesc
        data.append("price", formData.price);
        data.append("stock", formData.stock);
        data.append("category", formData.category);
        data.append("sizes", JSON.stringify(formData.sizes)); // Send sizes as JSON

        formData.images.forEach((image, index) => {
            if (image) data.append(`image`, image);
        });

        try {
            const url = product
                ? `${backend}/admin/product/edit/${product._id}`
                : `${backend}/admin/product/add`;

            const method = product ? "put" : "post";
            
            const res = await axios({
                method,
                url,
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200 || res.status === 201) {
                alert(product ? "Product updated successfully!" : "Product created successfully!");
                refreshProducts();
                closePopup();
            }
        } catch (error) {
            console.error("Error saving product:", error);
            setError(error?.response?.data?.message ?? "Failed to save product");
        }
    };

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                productId: product.productId,
                description: product.description,
                subDesc: product.subDesc, // Populate subDesc if editing
                category: product.category,
                stock: product.stock,
                price: product.price,
                images: product.images || [null],
                sizes: product.sizes || [], // Populate sizes if editing
            });
        }
    }, [product]);

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50 pt-20 font-marcellus">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {product ? "Edit Product" : "Create Product"}
                    </h2>
                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name and Product ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                            <input
                                type="text"
                                name="productId"
                                value={formData.productId}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                        {formData.images.map((image, index) => (
                            <div key={index} className="flex items-center mb-2 space-x-2">
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                                    className="flex-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {formData.images.length > 1 && (
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
                    {/* Description and Sub Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Description</label>
                        <textarea
                            name="subDesc"
                            value={formData.subDesc}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="2"
                            required
                        />
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Sizes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
                        {formData.sizes.map((size, index) => (
                            <div key={index} className="flex items-center space-x-4 mb-2">
                                <input
                                    type="text"
                                    placeholder="Size Type"
                                    value={size.sizeType}
                                    onChange={(e) => handleSizeChange(index, "sizeType", e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={size.amount}
                                    onChange={(e) => handleSizeChange(index, "amount", e.target.value)}
                                    className="w-24 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSize(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Minus size={20} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddSize}
                            className="mt-2 flex items-center text-green-500 hover:text-green-700"
                        >
                            <Plus size={20} className="mr-1" /> Add Size
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
                            {product ? "Save Changes" : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductPopup;
