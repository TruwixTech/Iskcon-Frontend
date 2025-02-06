import React from 'react'
import Navbar from '../Components/Navbar';
import { CartContext } from "../Context/CartContext";
import { useContext } from 'react';
function Confirm() {
    const { clearCart, removeFromCart, getCartTotal, addToCart, cartItems } =
        useContext(CartContext);
  return (
    <div className='bg-[#fde3b6] w-full h-auto'>
         <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>
      
      
      <div className="w-[90%] mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-5">
         <div className='flex '>
       <div className='w-[50%] flex flex-col gap-7 '>
        <h1 className='text-5xl font-bold text-black   px-5'>  Thank you for  your <br/>purchase!</h1>
       <p className=' px-5'>Your order is processing" means that your purchase has been received and is currently being prepared for shipment, which includes steps like verifying your details </p>
       
       <span className='text-xl font-bold text-black px-5 mt-4'>Billing address</span>
       
       
       <div className='flex mb-5'>
        <div className='w-1/3 flex flex-col  font-bold text-black px-5 '>
            <span> First Name :</span>
            <span> address :</span>
            <span> phone :</span>
            <span> Email :</span>
            
        </div>
      
        <div className='w-2/3 flex flex-col  text-black px-5 '>
            <span> Yash tyagi</span>
            <span> vill +post bijoli meerut</span>
            <span> 8923255693</span>
            <span> yash-truwix@113</span>
            
            
            
        </div>
       </div>
       <div className="flex mb-4 px-5 " >
              <button type="submit" className="w-[20%] bg-[#eb852c] text-white font-semibold py-3 rounded-full">
                Tracker order
              </button>
            </div>
       
       </div>
       
       
       <div className='w-[50%] flex flex-col items-center gap-7  '>
<div className='w-[80%] h-auto bg-slate-200  shadow-xl rounded-lg px-5'  >
    <h1 className='text-black text-[23px]  px-5 py-5 font-bold'>Order summary</h1>
    <hr className="bg-gray-400 h-[1px] border-0" />


                   <div className='  grid  grid-cols-2 gap-2  md:grid-cols-3 mt-2  place-content-center pb-3  '>
                            <div className='w-auto h-auto flex  flex-col  gap-1'>
                                <label for="location" className="font-semibold text-gray-700 py-1 ">Date</label>
                               <span >02 may 2023</span>
                 </div>
                            


                            <div className='w-auto h-auto flex  flex-col items-center border-l border-r border-gray-600 mt-2 gap-1  '>
                                
                                <label for="location" className="font-semibold text-gray-700 py-1 ">order Number</label>
                               <span >1234567890</span>
                             
                            </div>



                            <div className='w-auto h-auto flex  flex-col mt-2 gap-1'>
                                <label for="location" className="font-semibold text-gray-700 py-1 ">payment method</label>
                               <span >02 may 2023</span>
                            </div>

                            </div>
                            <hr className="bg-gray-400 h-[1px] border-dotted" />
        

<div className='flex gap-1'>
<div className="w-full flex flex-col h-auto gap-1 my-2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center   border-b gap-2 sm:gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 rounded-lg  sm:w-32 xl:w-12"
                />
                <div className="flex flex-col gap-1 justify-between h-full sm:py-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[15px] font-semibold sm:text-base xl:text-[15px]">
                      {item.name}
                    </h3>
                    {/* <p className="text-xs text-gray-600 sm:text-sm xl:text-base">
                      Category: {item.category}
                    </p> */}
                    <p className="text-xs  sm:text-sm xl:text-base">
                      &#x20B9; {item.price * item.quantity}
                    </p>
                  </div>
                  {/* <div className="w-full h-auto flex">
                    <div className="px-2 py-1 flex gap-2 text-xs items-center justify-center bg-[#ECA242] rounded-lg text-white sm:px-3 sm:text-base sm:rounded-xl sm:gap-3 xl:px-4 xl:py-2">
                      <span
                        onClick={() => removeFromCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        -
                      </span>
                      <span className="font-semibold xl:text-lg">
                        {item.quantity}
                      </span>
                      <span
                        onClick={() => addToCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        +
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold h-80 flex justify-center items-center">
              Cart is Empty
            </p>
          )}
        </div>
</div>
<hr className="bg-gray-400 h-[1px] border-0" />
<div className='flex mb-3 mt-3 justify-between '>
        <div className='w-1/3 flex flex-col    text-black px-5 '>
            <span> sub :</span>
            <span> spining:</span>
            <span> tax:</span>
           
            
        </div>
      
        <div className='w-2/3 flex flex-col items-end text-black px-5 '>
            <span>  ₹ <span>2110</span></span>
            <span>  ₹ <span>2.00</span></span> 
            <span>  ₹ <span>1.00</span></span>
            
            </div>
       </div>
       <hr className="bg-gray-400 h-[1px] border-0" />
   <div className='mt- 2 flex justify-between mb-3 px-5'>
      <h1> Order ToTAL :</h1>
      <span className='text-black font-bold'> ₹ <span className='text-black font-bold'>2250</span></span>
   </div>
   </div>

       </div>

















                                




         </div>
        </div>
    
    </div>
  )
}

export default Confirm