import { useEffect } from "react";
import Navbar from "./Navbar";
import UnderProgress from "./ProgressWork";
const ContactPage = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#fde3b6] w-full h-full">
      <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>
      <UnderProgress />
    </div>
  );
};

export default ContactPage;
