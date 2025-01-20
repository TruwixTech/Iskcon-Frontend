import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import cart from "../assets/cart.svg";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartSidebar, setCartSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For desktop
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // For mobile

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className="w-full h-[70px] rounded-[100px] px-6"
        style={{
          backgroundColor: "rgba(251,247,245,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="w-full h-full flex justify-between items-center">
          <Link to="/" className="flex justify-center items-center flex-shrink-0">
            <img src={logo} alt="logo" className="w-full h-full object-contain" />
          </Link>

        {/* Desktop Navigation */}
        <span className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-12 text-base font-medium">
            {[
              { path: "/about", label: "About Us" },
              { path: "/donation", label: "Donation" },
              { path: "/events", label: "Events" },
              { path: "/blogs", label: "Blogs" },
              { path: "/shop", label: "Shop" },
              { path: "/contacts", label: "Contacts" },
            ].map(({ path, label }) =>
              label === "Donation" ? (
                <li
                  key={path}
                  className="relative group flex items-center gap-2 cursor-pointer"
                  onMouseEnter={() => setDropdownOpen(true)}
                  // onMouseLeave={() => setDropdownOpen(false)}
                >
                  <span
                    className="flex items-center gap-2 text-black group-hover:text-[#eb852c]"
                  >
                    {label}
                    <IoIosArrowDown />
                  </span>
                  {dropdownOpen && (
                    <div className="absolute top-8 left-0 w-48 bg-white shadow-md rounded-xl" onMouseLeave={() => setDropdownOpen(false)}>
                      <ul className="flex flex-col p-2">
                        <li>
                          <NavLink
                            to="/donation"
                            className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                          >
                            General Donation
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/csr"
                            className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                          >
                            CSR Donation
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2 ${
                        isActive ? "text-[#eb852c] underline underline-offset-8" : "text-black"
                      } hover:text-[#eb852c]`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

            <button onClick={() => setCartSidebar(true)} className="text-black hover:text-[#eb852c]">
              <img src={cart} alt="cart" />
            </button>

            <NavLink
              to="/donate"
              className="px-8 py-3 bg-[#eb852c] text-white rounded-[124px] hover:bg-orange-600 transition ease-in-out"
            >
              Donate Now
            </NavLink>
          </span>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-black text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Menu with Smooth Slide Animation */}
          <div
            className={`fixed top-0 left-0 w-[75%] max-w-xs h-full bg-[#ece4c7] shadow-lg p-6 z-50 rounded-r-3xl transform transition-transform duration-300 ease-in-out
            ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          >
            <button className="absolute top-5 right-5 text-2xl" onClick={() => setMenuOpen(false)}>
              <IoMdClose />
            </button>

            <ul className="flex flex-col items-start gap-6 mt-12 text-base font-medium">
              {[
                { path: "/about", label: "About Us" },
                { path: "/donation", label: "Donation" },
                { path: "/events", label: "Events" },
                { path: "/blogs", label: "Blogs" },
                { path: "/shop", label: "Shop" },
                { path: "/contacts", label: "Contacts" },
              ].map(({ path, label }) =>
                label === "Donation" ? (
                  <li key={path}>
                    <div
                      className="flex items-center justify-between w-full"
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    >
                      <span className="text-black hover:text-[#eb852c]">
                        {label}
                      </span>
                      <IoIosArrowDown />
                    </div>
                    {mobileDropdownOpen && (
                      <ul className="mt-2 bg-white shadow-md rounded-md">
                        <li>
                          <NavLink
                            to="/donation"
                            className="block px-4 py-2 hover:bg-[#eb852c] hover:text-white"
                            onClick={() => setMenuOpen(false)}
                          >
                            General Donation
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/csr"
                            className="block px-4 py-2 hover:bg-[#eb852c] hover:text-white"
                            onClick={() => setMenuOpen(false)}
                          >
                            CSR Donation
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-[#eb852c] underline-[#eb852c]" : "text-black underline underline-offset-8"
                        } hover:text-[#eb852c]`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <div className="flex flex-col gap-4 mt-6">
              <button className="flex items-center justify-center text-black hover:text-[#eb852c]" onClick={() => setCartSidebar(true)}>
                <img src={cart} alt="cart" />
              </button>
              <NavLink
                to="/donate"
                className="xl:px-8 py-3 bg-[#eb852c] text-white text-center rounded-[124px] hover:bg-orange-600 transition ease-in-out"
                onClick={() => setMenuOpen(false)}
              >
                Donate Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar with Smooth Animation */}
      <div
        className={`fixed inset-y-0 z-50 right-0 w-[85%] bg-white shadow-lg p-5 transform transition-transform duration-300 ease-in-out md:w-[35%] 
        ${cartSidebar ? "translate-x-0" : "translate-x-full"}`}
      >
        <button className="absolute top-3 right-3 text-gray-600" onClick={() => setCartSidebar(false)}>
          <IoMdClose size={40} />
        </button>
        <h2 className="text-lg font-bold">Your Cart</h2>
        <p className="mt-2 text-gray-600">Cart is empty.</p>
      </div>

      {/* Backdrop for Cart Sidebar */}
      {cartSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setCartSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
