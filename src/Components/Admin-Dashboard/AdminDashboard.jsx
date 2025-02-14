import React from "react";
import { Link } from "react-router-dom";

const logout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

function AdminDashboard() {
  return (
    <div className="w-full h-auto flex flex-col">
      <div className="w-full flex justify-center gap-20 mt-10">
        <h1 className="text-center text-4xl font-semibold my-3">
          Admin-Dashboard
        </h1>
        <button onClick={logout} className="bg-[#eb852c] text-white font-bold py-2 px-10 rounded-2xl">Log out</button>
      </div>
      <div className="w-full h-auto flex flex-wrap px-5 my-10 md:px-10 xl:px-20 gap-4 md:gap-8 justify-center items-center">
        {[
          { label: "Stats", link: "/admin-dashboard/stats" },
          { label: "Events", link: "/admin-dashboard/events" },
          { label: "Services", link: "/admin-dashboard/services" },
          { label: "Donation", link: "/admin-dashboard/donation" },
          { label: "Blogs", link: "/admin-dashboard/blogs" },
          { label: "Products", link: "/admin-dashboard/products" },
          // { label: "Guest House", link: "/admin-dashboard/guest-house" },
          { label: "Media", link: "/admin-dashboard/media" },
          // { label: "Offline Classes", link: "/admin-dashboard/classes" },
          { label: "CSR Donation", link: "/admin-dashboard/csrdonation" },
        ].map((item, index) => (
          <Link
            to={item.link}
            className="w-[400px] h-[200px] p-3 lg:p-5 border rounded-xl shadow-md duration-500 ease-in-out hover:shadow-2xl"
            key={index}
          >
            <h1 className="text-xl md:text-2xl font-bold">{item.label}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
