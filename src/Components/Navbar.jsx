import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import cart from "../assets/cart.svg";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full h-[70px]   rounded-[100px] px-6" style={{backgroundColor: "rgba(211, 229, 224, 0.4)",backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)"}}>
      <div className="w-full h-full flex justify-between items-center">
        <span className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </span>
        <span className="flex items-center gap-10">
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
                className={`${
                  isActive ? "underline underline-offset-8" : " "
                } flex items-center group `}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 ${
                      isActive ? "text-[#eb852c] underline underline-offset-8" : "text-black"
                    } hover:text-[#eb852c]`
                  }
                >
                  <span
                    className={`${
                      isActive ? "underline underline-offset-8" : ""
                    } group-hover:underline group-hover:underline-offset-8`}
                  >
                    {label}
                  </span>
                  {["/about-us", "/donation", "/events"].includes(path) && (
                    <IoIosArrowDown
                      className={`${
                        isActive ? "rotate-180" : ""
                      } group-hover:fill-[#eb852c] transition-transform duration-300`}
                    />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <NavLink to="/cart" className="text-black hover:text-[#eb852c]">
            <img src={cart} alt="" />
          </NavLink>
          <NavLink
            to="/donate"
            className="px-8 py-3 bg-[#eb852c] text-white rounded-[124px] hover:bg-orange-600 transition ease-in-out"
          >
            Donate Now
          </NavLink>
        </span>

        {/* Cart and Donate Button */}
        {/* <div className="flex items-center space-x-4">
       
      </div> */}
      </div>
    </div>
  );
};

export default Navbar;
