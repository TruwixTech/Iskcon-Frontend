import logo from "../assets/logo.svg";
import { Link,NavLink } from "react-router-dom";
import cart from "../assets/cart.svg";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link to="/" className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <span className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-12 text-base font-medium">
            {[
              { path: "/about-us", label: "About Us" },
              { path: "/donation", label: "Donation" },
              { path: "/events", label: "Events" },
              { path: "/blogs", label: "Blogs" },
              { path: "/shop", label: "Shop" },
              { path: "/contacts", label: "Contacts" },
            ].map(({ path, label }) => (
              <li
                key={path}
                className="flex items-center group"
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 ${
                      isActive ? "text-[#eb852c] underline underline-offset-8" : "text-black"
                    } hover:text-[#eb852c]`
                  }
                >
                  <span className="group-hover:underline group-hover:underline-offset-8">
                    {label}
                  </span>
                  {["/about-us", "/donation", "/events"].includes(path) && (
                    <IoIosArrowDown className="group-hover:fill-[#eb852c] transition-transform duration-300" />
                  )}
                </NavLink>
              </li>
            ))}
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
          className="md:hidden text-black text-2xl"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#ece4c7] shadow-md p-6 md:hidden z-50 rounded-3xl mt-4">
            <ul className="flex flex-col items-center gap-6 text-base font-medium">
              {[
                { path: "/about-us", label: "About Us" },
                { path: "/donation", label: "Donation" },
                { path: "/events", label: "Events" },
                { path: "/blogs", label: "Blogs" },
                { path: "/shop", label: "Shop" },
                { path: "/contacts", label: "Contacts" },
              ].map(({ path, label }) => (
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
              ))}
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
                className="px-8 py-3 bg-[#eb852c] text-white text-center rounded-[124px] hover:bg-orange-600 transition ease-in-out"
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
