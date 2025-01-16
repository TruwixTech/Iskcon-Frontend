import React from 'react'
import Navbar from '../Navbar'
import bg from '../../assets/krishnabg.png'
import frame from '../../assets/frame.png'

const Section1 = () => {
  return (
    <div 
      className="w-full h-screen relative" 
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'right', 
      }}
    >
      <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>
      <div className=' w-[70%] h-screen absolute top-0 left-0 z-10'
        style={{
          backgroundImage: `url(${frame})`,
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
         
        }}
      >

      </div>
    </div>
  )
}

export default Section1
