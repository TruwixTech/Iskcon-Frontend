import React from 'react'
import Navbar from '../Components/Navbar'
import Section1 from '../Components/EventPageComponents/Section1'

const EventPage = () => {
  return (
    <div className='bg-[#fde3b6] w-full h-full'>
      <div className="px-4 md:px-20 py-10 relative z-50">
        <Navbar />
      </div>
      <Section1 />
    </div>
  )
}

export default EventPage
