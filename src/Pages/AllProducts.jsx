import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ShopPageComponents/ProductCard';
import axios from 'axios'
const backend = import.meta.env.VITE_BACKEND_URL;
import Navbar from '../Components/Navbar';
const AllProducts = () => {
    useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
    const [products, setProducts] = useState([]);
     const [scrollY, setScrollY] = useState(0);
    // Simulated API call (replace with actual API request)
    async function fetchProducts() {
        try {
            const response = await axios.get(`${backend}/admin/product/all`);
            setProducts(response.data.data);
        } catch (error) {
            console.log("Error while fetching products", error);
        }
    }
     useEffect(() => {
            const handleScroll = () => {
                setScrollY(window.scrollY);
            };
    
            window.addEventListener("scroll", handleScroll);
    
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);
    
        useEffect(() => {
            fetchProducts()
        }, [])

    return (
        <div className='w-full h-auto flex flex-col bg-[#fde3b6] px-5 pt-10 md:px-10 xl:px-20  pb-8 md:pb-14 xl:pb-20'>
        <Navbar className />
        <span className='font-prata text-center text-3xl font-bold sm:text-3xl md:text-3xl pt-10'>All Products</span>
            <div className='w-full h-auto flex justify-between items-center text-lg sm:text-xl md:text-2xl'>
            
            </div>
            <div className='w-full h-auto mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {products.length > 0 ? (
                    products.map((item, index) => (
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
