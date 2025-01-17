import React from 'react'
import UnderProgress from '../Components/ProgressWork'
import Navbar from '../Components/Navbar'

const EventPage = () => {
  return (
    <div className='bg-[#fde3b6] w-full h-full'>
          <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>
      <UnderProgress />
    </div>
  )
}

export default EventPage
