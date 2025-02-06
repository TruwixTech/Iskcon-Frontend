import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { MdPhoneCallback } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import { FaChildReaching } from "react-icons/fa6";
import { Link } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND_URL;

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for form fields and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(`${backend}/admin/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            mobile: "",
            subject: "",
            message: "",
          });
        } else {
          alert(result.error || "Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#fde3b6] w-full h-auto">
      <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>

      <div className="w-full h-auto flex flex-col justify-center items-center font-prata">
        <h1 className="text-black text-[40px] py-8 animate-fade-in">
          Contact us
        </h1>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Call Us Card */}
          <div className="w-full md:w-[400px] h-auto bg-white mb-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
            <div className="h-[130px] bg-[#eb852c] flex justify-center items-center rounded-t-lg">
              <TfiHeadphoneAlt
                size={60}
                className="text-white animate-bounce"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 p-6">
              <span className="text-[26px] text-gray-800 font-bold py-4">
                Call us
              </span>
              <p className="px-6 text-center py-6 text-gray-600">
                Need assistance? Call our customer care team anytime for
                support.
              </p>
            </div>
            <div className="py-10 flex justify-center items-center text-[20px]">
              <span className="w-10 h-10 bg-[#eb852c] rounded-full flex justify-center items-center text-white hover:bg-[#d9731f] transition-colors duration-300">
                <MdPhoneCallback size={15} />
              </span>
              <span className="ml-2 text-gray-700">+91-6396075703</span>
            </div>
          </div>

          {/* Email Us Card */}
          <div className="w-full md:w-[400px] h-auto bg-white mb-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up animate-delay-200">
            <div className="h-[130px] bg-[#eb852c] flex justify-center items-center rounded-t-lg">
              <RiMailSendLine size={60} className="text-white animate-bounce" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 p-6">
              <span className="text-[26px] text-gray-800 font-bold py-4">
                Write us
              </span>
              <p className="px-8 text-center py-6 text-gray-600">
                Have a question? Email our customer care team!
              </p>
            </div>
            <div className="py-10 flex justify-center items-center text-[20px]">
              <span className="w-10 h-10 bg-[#eb852c] rounded-full flex justify-center items-center text-white hover:bg-[#d9731f] transition-colors duration-300">
                <RiMailSendLine size={15} />
              </span>
              <span className="ml-2 text-gray-700">
                info@iskconwavecity.com
              </span>
            </div>
          </div>

          {/* Reach Us Card */}
          <div className="w-full md:w-[400px] h-auto bg-white mb-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up animate-delay-400">
            <div className="h-[130px] bg-[#eb852c] flex justify-center items-center rounded-t-lg">
              <FaChildReaching
                size={60}
                className="text-white animate-bounce"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 p-6">
              <span className="text-[26px] text-gray-800 font-bold py-4">
                Reach us
              </span>
              <p className="px-6 text-center py-6 text-gray-600">
                Locate our temple using Google Maps for easy navigation.
              </p>
            </div>
            <div className="w-full flex justify-center mt-4 px-6 py-4">
              <Link
                to="https://www.google.com/maps/dir/ISKCON+Wave+City,+Unnamed+Road,+Wave+City,+Ghaziabad,+Uttar+Pradesh/JGW5%2BW35,+Unnamed+Road,+Wave+City,+Ghaziabad,+Uttar+Pradesh+201002/@28.647339,77.507582,20.87z/data=!4m13!4m12!1m5!1m1!1s0x390ced5d54e42653:0xe4b6897f26616266!2m2!1d77.5077254!2d28.647275!1m5!1m1!1s0x390ced5d54e42653:0xe4b6897f26616266!2m2!1d77.5077254!2d28.647275?entry=ttu&g_ep=EgoyMDI1MDIwMi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" rel="noopener noreferrer" className="font-bold w-[70%] border-2 bg-[#eb852c] rounded-full text-white py-2 flex justify-center gap-4 items-center hover:bg-[#d9731f] transition-colors duration-300"
              >
                <FaChildReaching size={20} />
                Get Direction
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="w-full flex justify-center my-6 px-6 animate-fade-in">
          <button className="font-bold w-[10%] border-2 bg-[#eb852c] rounded-full text-white py-2 flex justify-center gap-4 items-center hover:bg-[#d9731f] transition-colors duration-300">
            Explore FAQS
          </button>
        </div> */}

        {/* Contact Form */}
        <div className="w-[90%] mx-auto p-6 bg-white shadow-lg rounded-lg mb-5 animate-fade-in">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-black outline-none transition-all duration-300 hover:border-[#eb852c]"
                />
                <p className="text-red-500 text-sm">{errors.name}</p>
              </div>
              <div>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-black outline-none transition-all duration-300 hover:border-[#eb852c]"
                />
                <p className="text-red-500 text-sm">{errors.email}</p>
              </div>
              <div>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-black outline-none transition-all duration-300 hover:border-[#eb852c]"
                />
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              </div>
            </div>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all duration-300 hover:border-[#eb852c]"
            />
            <p className="text-red-500 text-sm">{errors.subject}</p>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black resize-none outline-none transition-all duration-300 hover:border-[#eb852c]"
            ></textarea>
            <p className="text-red-500 text-sm">{errors.message}</p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[20%] bg-[#eb852c] text-white font-semibold py-3 rounded-lg hover:bg-[#d9731f] transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
