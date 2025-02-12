import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ShopPageComponents/ProductCard';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const backend = import.meta.env.VITE_BACKEND_URL;

const AllProducts = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState(["Books", "Grocery", "Flowers", "Puja Thali", "Clothes"]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    
    async function fetchProducts() {
        try {
            const response = await axios.get(`${backend}/admin/product/all`);
            setProducts(response.data.data);
            setFilteredProducts(response.data.data);
        } catch (error) {
            console.log("Error while fetching products", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;
        
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (priceFilter) {
            if (priceFilter === "low-to-high") {
                filtered = [...filtered].sort((a, b) => a.price - b.price);
            } else if (priceFilter === "high-to-low") {
                filtered = [...filtered].sort((a, b) => b.price - a.price);
            }
        }
        
        setFilteredProducts(filtered);
    }, [selectedCategory, priceFilter, products]);

    return (
        <div className='w-full h-auto flex flex-col bg-[#fde3b6] px-5 pt-10 md:px-10 xl:px-20 pb-8 md:pb-14 xl:pb-20'>
            <Navbar />
            <span className='font-prata text-center text-3xl font-bold sm:text-3xl md:text-3xl pt-10'>All Products</span>
            
            <div className='w-full flex justify-end items-center gap-4 mt-6'>
                {/* Category Filter */}
                <select
                    className='p-2 border rounded-md shadow-sm bg-white'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                {/* Price Filter */}
                <select
                    className='p-2 border rounded-md shadow-sm bg-white'
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                >
                    <option value="">Sort by Price</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
            </div>
            
            <div className='w-full h-auto mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <ProductCard 
                            key={index} 
                            productId={item._id} 
                            productImage={item.images?.[0] || 'default-image.jpg'} 
                            productName={item.name} 
                            productPrice={item.price} 
                            productDesc={item.subDesc} 
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No products available</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
