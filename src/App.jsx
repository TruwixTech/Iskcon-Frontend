import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import {CartProvider} from './Context/CartContext'

function App() {

  return (
    <>
    <CartProvider>
      <Outlet />
      <Footer />
      </CartProvider>
    </>
  )
}

export default App

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Homepage from './Pages/Homepage';
// export default function App() {

//   return (
//     <BrowserRouter >
//       {/* Navbar */}
      
      

//       {/* Routes */}
//       <Routes>
        
//         <Route path="/" element={<Homepage />} />
//         <Route path="*" element={<h1>Page Not Found</h1>} />
//       </Routes>
//     </BrowserRouter>
//   )
// }
