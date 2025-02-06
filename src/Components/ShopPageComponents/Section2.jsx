import React, { useEffect, useState } from 'react'
import Category1 from '../../assets/category1.svg'
import Category2 from '../../assets/category2.svg'
import Category3 from '../../assets/category3.svg'
import Category4 from '../../assets/category4.svg'
import Border1 from '../../assets/section1border1.svg'
import Border2 from '../../assets/section1border2.svg'
import axios from 'axios'
import ProductCard from './ProductCard'
import {useNavigate} from 'react-router-dom';

const backend = import.meta.env.VITE_BACKEND_URL;

function Section2() {
    const [scrollY, setScrollY] = useState(0);
    const [products, setProducts] = useState([]);

    const category = [
        {
            id: 1,
            image: Category1,
            categoryName: "Books"
        },
        {
            id: 2,
            image: Category2,
            categoryName: "Grocery"
        },
        {
            id: 3,
            image: Category3,
            categoryName: "Flowers"
        },
        {
            id: 4,
            image: Category4,
            categoryName: "Puja Thali"
        },
        {
            id: 5,
            image: Category4,
            categoryName: "Puja Thali"
        }
    ]

    async function fetchProducts() {
        try {
            const response = await axios.get(`${backend}/admin/product/all`);
            setProducts(response.data.data);
        } catch (error) {
            console.log("Error while fetching products", error);
        }
    }

    // Update scrollY value on scroll
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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/all-products");
  }
    return (
        <>
            <div className='w-full h-auto flex flex-col px-5 py-6 gap-8 md:py-10 xl:py-14'>
                <h1 className='text-center font-prata text-xl lg:text-2xl'>Shop By Category</h1>
                <div className='w-full h-auto flex flex-col sm:flex-row sm:flex-wrap justify-center items-center overflow-hidden gap-7'>
                    {
                        category.map((item, index) => (

                            <div key={index} className='w-[250px] h-auto flex flex-col gap-4 2xl:w-[270px]'>
                                <div className='w-full h-[250px] rounded-full flex justify-center items-center relative 2xl:h-[265px]'>
                                    <div className='w-[85%] h-[85%] border-[10px] rounded-full border-[#bf9d78] relative flex justify-center items-center'>
                                        <div className='w-full h-full flex flex-col justify-center items-center relative py-3 gap-3 2xl:py-8 z-30'>
                                            <div className='w-full h-auto flex flex-col justify-center items-center gap-2'>
                                                <img src={item.image} alt="icons" className='mx-auto w-auto h-40' />
                                            </div>
                                        </div>
                                        <img src={Border2} alt="border 2" className='w-full h-full absolute ' />
                                    </div>
                                    <img src={Border1} alt="border 1" className='w-full h-full absolute'
                                        style={{
                                            transform: `rotate(${scrollY}deg)`, // Spins the image
                                            transition: "transform 5s linear",
                                        }} />
                                </div>
                                <p className='w-full h-auto text-center font-nunito font-semibold text-xl'>
                                    {
                                        item.categoryName
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-full h-auto flex flex-col bg-[#fde3b6] px-5 md:px-10 xl:px-20 py-8 md:py-14 xl:py-20'>
                <div className='w-full h-auto flex justify-between items-center text-lg sm:text-xl md:text-2xl'>
                    <span className='font-prata'>Best Sellers</span>
                    <button onClick={handleClick} className='font-nunito'>View all</button>
                </div>
                <div className='w-full h-auto mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        products.map((item, index) => (
                            <ProductCard key={index} productId={item._id} productImage={item.images[0]} productName={item.name} productPrice={item.price} productDesc={item.subDesc} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Section2