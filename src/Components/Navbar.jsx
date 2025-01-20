import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import cart from "../assets/cart.svg";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For desktop
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // For mobile

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="w-full h-[70px] rounded-[100px] px-6"
      style={{
        backgroundColor: "rgba(211, 229, 224, 0.4)",
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

          <NavLink to="/cart" className="text-black hover:text-[#eb852c]">
            <img src={cart} alt="cart" />
          </NavLink>

          <NavLink
            to="/donate"
            className="px-8 py-3 bg-[#eb852c] text-white rounded-[124px] hover:bg-orange-600 transition ease-in-out"
          >
            Donate Now
          </NavLink>
        </span>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-black text-2xl"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#ece4c7] shadow-md p-6 lg:hidden z-50 rounded-3xl mt-4">
            <ul className="flex flex-col items-center gap-6 text-base font-medium">
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
              <NavLink
                to="/cart"
                className="flex items-center justify-center text-black hover:text-[#eb852c]"
                onClick={() => setMenuOpen(false)}
              >
                <img src={cart} alt="cart" />
              </NavLink>
              <NavLink
                to="/donate"
                className="xl:px-8 py-3 bg-[#eb852c] text-white text-center rounded-[124px] hover:bg-orange-600 transition ease-in-out"
                onClick={() => setMenuOpen(false)}
              >
                Donate Now
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
