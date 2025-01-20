import React from 'react'
import { useState,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
const backend = import.meta.env.VITE_BACKEND_URL;
const CSRDonation = () => {
     const [popup, setPopup] = useState(false);
     const [currentCSRDonation, setCurrentCSRDonation] = useState(null);
     const [csrDonation, setCsrDonation] = useState([]);

     function handleOpenPopup(currentCSRDonation = null) {
        setCurrentBlog(csrDonation);
        setPopup(true);
      }
    
  return (
    <div>
      
    </div>
  )
}

export default CSRDonation
