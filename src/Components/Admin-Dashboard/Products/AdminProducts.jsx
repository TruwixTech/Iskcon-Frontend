import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CreateProducts from './AdminCreateProductPopup';

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminProducts() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const openPopup = (product = null) => {
    setCurrentProduct(product);
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentProduct(null);
  }

  async function fetchProducts() {
    try {
      const response = await axios.get(`${backend}/admin/product/all`);
      setProducts(response.data.data);
    } catch (error) {
      console.log("Error while fetching products", error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${backend}/admin/product/delete/${id}`)
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (error) {
      console.log("Error while deleting product", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className='w-full h-auto flex flex-col'>
      <h1 className='text-center text-4xl font-semibold my-3'>Admin-Product-Section</h1>
      <div className='w-full h-auto flex flex-col my-10'>
        <div className='w-full h-auto flex flex-col justify-center items-center mb-10 gap-7'>
          <span
            onClick={() => openPopup()}
            className='w-auto px-5 py-2 border text-yellow-500 rounded-md active:bg-yellow-600 active:text-white font-medium border-yellow-500 md:hover:bg-yellow-600 duration-300 ease-in-out md:hover:text-white cursor-pointer'>
            Create A Products
          </span>
        </div>
        <div className='w-full h-auto px-5 md:px-10 lg:px-20 gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center'>
          {products.map((product, index) => (
            <div className='w-full h-auto p-3 lg:p-5 flex flex-col items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
              <img src={product?.images[0]} alt="product image" className='w-full h-40 object-cover' />
              <h1 className='text-xl font-semibold'>{product?.name}</h1>
              <p className='w-full h-auto text-gray-600 text-sm'>{product.description}</p>
              <p className='w-full'><span className='font-semibold'>Category : </span><span className='text-gray-600'>{product.category}</span></p>
              <p className='w-full'><span className='font-semibold'>Product-Id : </span><span className='text-gray-600'>{product.productId}</span></p>
              <div className='w-full h-auto flex justify-between items-center'>
                <p><span className='font-semibold'>Price : </span><span className='text-gray-600'>₹{product.price}</span></p>
                <p><span className='font-semibold'>Stock : </span><span className='text-gray-600'>{product.stock}</span></p>
              </div>
              <div className='w-full h-auto flex justify-between items-center'>
                <button onClick={() => openPopup(product)} className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                <button onClick={() => deleteProduct(product._id)} className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {isPopupOpen && (
          <CreateProducts
            product={currentProduct}
            closePopup={closePopup}
            refreshProducts={fetchProducts}
          />
        )}
      </div>
    </div>
  )
}

export default AdminProducts