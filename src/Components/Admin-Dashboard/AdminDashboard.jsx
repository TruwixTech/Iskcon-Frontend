import React from "react";
// import { Link } from "react-router-dom";
// import styleborder from "../../assets/styleborder.webp";
import signUpImage from "../../assets/signUpImage.webp";
import adminlogo from "../../assets/adminlogo.svg";
import { useState } from "react";
import {
  FaRegChartBar,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaBoxOpen,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
// const logout = () => {
//     localStorage.removeItem("isAuthenticated");
//     window.location.reload();
//   };

function AdminDashboard() {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard size={20} />, active: true },
    { name: "Donations", icon: <FaBoxOpen size={18} />, dropdown: true },
    { name: "Services", icon: <FaUsers size={18} />, dropdown: true },
    { name: "Orders", icon: <FaClipboardList size={18} />, dropdown: true },
    { name: "Stat Control", icon: <FaRegChartBar size={18} />, dropdown: true },
    { name: "B2B eCommerce", icon: <BsBoxSeam size={18} />, dropdown: true },
    { name: "Settings", icon: <FaCog size={18} />, dropdown: true },
  ];
  return (
    // <div className="w-full h-auto flex flex-col bg-[#fde3b6]">
    //   <div className="w-full flex justify-center gap-20 mt-10">
    //     <h1 className="text-center text-4xl font-semibold my-3 font-prata">
    //       Admin-Dashboard
    //     </h1>
    //   </div>
    //   <div className="w-full h-auto flex flex-wrap px-5 my-10 md:px-10 xl:px-20 gap-4 md:gap-8 justify-center items-center">
    //     {[
    //       { label: "Stats", link: "/admin-dashboard/stats" },
    //       { label: "Events", link: "/admin-dashboard/events" },
    //       { label: "Services", link: "/admin-dashboard/services" },
    //       { label: "Donation", link: "/admin-dashboard/donation" },
    //       { label: "Blogs", link: "/admin-dashboard/blogs" },
    //       { label: "Products", link: "/admin-dashboard/products" },
    //       // { label: "Guest House", link: "/admin-dashboard/guest-house" },
    //       { label: "Media", link: "/admin-dashboard/media" },
    //       { label: "Live Darshan", link: "/admin-dashboard/live-darshan" },
    //       // { label: "Offline Classes", link: "/admin-dashboard/classes" },
    //       { label: "CSR Donation", link: "/admin-dashboard/csrdonation" },
    //       { label: "Story", link: "/admin-dashboard/story" },
    //     ].map((item, index) => (
    //       <Link
    //         to={item.link}
    //         className="w-[400px] h-[200px] flex justify-center items-center hover:scale-110 duration-300 transition-all"
    //         key={index}
    //         style={{ backgroundImage: `url(${styleborder})`,
    //         backgroundPosition: 'center',
    //         backgroundRepeat: 'no-repeat',
    //         backgroundSize: 'contain'
    //          }}
    //       >
    //         <h1 className="text-xl md:text-2xl font-bold font-prata text-[#ddae4a]">{item.label}</h1>
    //       </Link>
    //     ))}
    //   </div>
    //   <div className="w-full flex justify-center pb-20">
    //   <button onClick={logout} className="bg-[#eb852c] text-white font-bold py-2 px-20 rounded-2xl">Log out</button>

    //   </div>
    // </div>
    <>
      <div
        className="w-full h-screen relative flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${signUpImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-20"></div>
        <div className="w-full absolute flex justify-center h-full items-center p-8  z-40">
          <div className="h-full w-full bg-[#fff4dc] rounded-[44px] p-4">
            <div className="w-1/5 h-full border-2 border-red-500 flex flex-col items-center">
              <div className="w-full flex justify-center items-center">
                <img src={adminlogo} alt="" />
              </div>
              <div className="w-64  bg-[#FEF4DC] p-4">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => item.dropdown && toggleMenu(item.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-700 transition-all ${
                          item.active
                            ? "bg-[#FFECC5] font-medium"
                            : "hover:bg-[#FFECC5]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon}
                          {item.name}
                        </span>
                        {item.dropdown && (
                          <IoIosArrowDown
                            size={16}
                            className={`transition-transform ${
                              openMenus[item.name] ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
