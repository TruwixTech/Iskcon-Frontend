import React, { useState } from 'react'
import CreateProductPopup from './AdminCreateProductPopup';
import { NavLink } from 'react-router-dom';

function AdminProducts() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const openPopup = (product = null) => {
    setCurrentProduct(product);
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentProduct(null);
  }

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
          {[{ image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }].map((event, index) => (
            <div className='w-full h-auto p-3 lg:p-5 flex flex-col items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
              <img src={event.image} alt="" className='w-full h-40' />
              <h1 className='text-xl font-semibold'>{event.title}</h1>
              <div className='w-full h-auto flex justify-between items-center'>
                <span>Category</span>
                <span>Product_Id</span>
              </div>
              <div className='w-full h-auto flex justify-between items-center'>
                <span>Stock</span>
                <span>Price</span>
              </div>
              <div className='w-full h-auto flex justify-between items-center'>
                <button onClick={() => openPopup()} className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                <button className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {isPopupOpen && (
          <CreateProductPopup
            product={currentProduct}
            closePopup={closePopup}
            // refreshProducts={fetchProducts}
          />
        )}
      </div>
    </div>
  )
}

export default AdminProducts