import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import AdminLogin from './Components/AdminLogin.jsx'
import AdminDashboard from './Components/Admin-Dashboard/AdminDashboard.jsx'
import AdminStats from './Components/Admin-Dashboard/Stats/AdminStats.jsx'
import AdminEvents from './Components/Admin-Dashboard/Events/AdminEvents.jsx'
import AdminServices from './Components/Admin-Dashboard/Services/AdminServices.jsx'
import AdminDonation from './Components/Admin-Dashboard/Donation/AdminDonation.jsx'
import AdminBlogs from './Components/Admin-Dashboard/Blogs/AdminBlogs.jsx'
import AdminProducts from './Components/Admin-Dashboard/Products/AdminProducts.jsx'
import CreateEvents from './Components/Admin-Dashboard/Events/CreateEvents.jsx'
import AdminSingleEvent from './Components/Admin-Dashboard/Events/AdminSingleEvent.jsx'
import BlogsPage from './Components/BlogPageComponent/BlogPage.jsx'
import ContactPage from './Components/ContactPage.jsx'
import Cart from './Components/Cart.jsx'
import CreateBlogs from './Components/Admin-Dashboard/Blogs/CreateBlogs.jsx'
import AdminSingleBlog from './Components/Admin-Dashboard/Blogs/AdminSingleBlog.jsx'
import AdminSingleService from './Components/Admin-Dashboard/Services/AdminSingleService.jsx'
import CreateService from './Components/Admin-Dashboard/Services/CreateService.jsx'
import AdminGuestHouse from './Components/Admin-Dashboard/GuestHouse/AdminGuestHouse.jsx'
import AdminSingleGuestHouse from './Components/Admin-Dashboard/GuestHouse/AdminSingleGuestHouse.jsx'
import CreateGuestHouse from './Components/Admin-Dashboard/GuestHouse/CreateGuestHouse.jsx'
import AdminClasses from './Components/Admin-Dashboard/Classes/AdminClasses.jsx'
import CreateOfflineClasses from './Components/Admin-Dashboard/Classes/CreateOfflineClasses.jsx'
import SingleClass from './Components/Admin-Dashboard/Classes/SingleClass.jsx'
import AdminMedia from './Components/Admin-Dashboard/Media/AdminMedia.jsx'
import AdminSingleMedia from './Components/Admin-Dashboard/Media/AdminSingleMedia.jsx'
import CreateMedia from './Components/Admin-Dashboard/Media/CreateMedia.jsx'
import DonationPage from './Pages/DonationPage.jsx'
import SinglePageDonation from './Components/Admin-Dashboard/Donation/SinglePageDonation.jsx'
import DonationForm from './Components/DonationForm.jsx'
import ShopPage from './Pages/ShopPage.jsx'
import SingleProduct from './Components/ShopPageComponents/SingleProduct.jsx'
import AboutUs from './Pages/AboutPage.jsx'
import CardDetails from './Pages/CardDetails.jsx'
import EventPage from './Pages/EventPage.jsx'
import SignUpPage from './Pages/SignUpPage.jsx'
import SignInPage from './Pages/SignInPage.jsx'
import ForgotPassword from './Pages/ForgotPassword.jsx'
import ResetPassword from './Pages/ResetPassword.jsx'
import CSRPage from './Pages/CSRPage.jsx'
import CSRDonation from './Components/Admin-Dashboard/CSRDonation/CSRDonation.jsx'
import CreateCSRDonationPage from './Components/Admin-Dashboard/CSRDonation/EditCSRDonationPopup.jsx'
import SingleDonation from './Components/DonationComponents/SingleDonation.jsx'
import SingleBlog from './Components/BlogPageComponent/SingleBlog.jsx'
import MembershipPage from './Pages/MembershipPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Homepage />} />
        {/* Admin Related routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path='/admin-dashboard/stats' element={<AdminStats />} />
        {/* Admin Events Related Routes */}
        <Route path='/admin-dashboard/events' element={<AdminEvents />} />
        <Route path='/admin-dashboard/events/create-event' element={<CreateEvents />} />
        <Route path='/admin-dashboard/events/single-event/:id' element={<AdminSingleEvent />} />
        {/* Admin Blogs Related Routes */}
        <Route path='/admin-dashboard/blogs' element={<AdminBlogs />} />
        <Route path='/admin-dashboard/blogs/create-blog' element={<CreateBlogs />} />
        <Route path='/admin-dashboard/blogs/single-blog/:id' element={<AdminSingleBlog />} />
        {/* Admin Services Related Routes */}
        <Route path='/admin-dashboard/services' element={<AdminServices />} />
        <Route path='/admin-dashboard/services/create-service' element={<CreateService />} />
        <Route path='/admin-dashboard/services/single-service/:id' element={<AdminSingleService />} />
        {/* Admin Donation Related Routes */}
        <Route path='/admin-dashboard/donation' element={<AdminDonation />} />
        <Route path='/admin-dashboard/donation/single-donation/:id' element={<SinglePageDonation />} />

        {/* Admin Products Related Routes */}
        <Route path='/admin-dashboard/products' element={<AdminProducts />} />
        {/* Admin Guest House Related Routes */}
        <Route path='/admin-dashboard/guest-house' element={<AdminGuestHouse />} />
        <Route path='/admin-dashboard/guest-house/create-guest-house' element={<CreateGuestHouse />} />
        <Route path='/admin-dashboard/guest-house/guest-house/:id' element={<AdminSingleGuestHouse />} />
         {/* Admin Offline classes Related Routes */}
        <Route path='/admin-dashboard/classes' element={<AdminClasses/>} />
        <Route path='/admin-dashboard/classes/create-classes' element={<CreateOfflineClasses/>} />
        <Route path='/admin-dashboard/classes/class/:id' element={<SingleClass/>} />
        {/* Admin Media Related Routes */}
        <Route path='/admin-dashboard/media' element={<AdminMedia />} />
        <Route path='/admin-dashboard/media/create-media' element={<CreateMedia />} />
        <Route path='/admin-dashboard/media/single-media/:id' element={<AdminSingleMedia />} />

        {/* Admin CSR Donation Routes */}
        <Route path='/admin-dashboard/csrdonation' element={<CSRDonation />} />
        <Route path='/admin-dashboard/csr-donation/create-csr-donation' element={<CreateCSRDonationPage />} />
        {/* Public Routes  */}
        <Route path="/shop" element={<ShopPage/>} />
        <Route path="/shop/single-product/:id" element={<SingleProduct />} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/blogs/single-blog/:id" element={<SingleBlog/>} />
        <Route path="/contacts" element={<ContactPage/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/details/:id" element={<CardDetails />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/donation/single-donation/:id" element={<SingleDonation />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/csr" element={<CSRPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
