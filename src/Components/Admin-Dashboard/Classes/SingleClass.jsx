import React from 'react';

function SingleClass() {
    return (
        <div className="w-full h-auto flex flex-col my-10 px-5 md:px-10 lg:px-20">
            {/* Class Image */}
            <img 
                src="" 
                alt="Class Image" 
                className="w-full h-40 rounded-lg bg-gray-200 sm:h-60 md:h-80 lg:h-[400px] xl:h-[450px]" 
            />
            
            {/* Class Title */}
            <h1 className="my-4 lg:my-6 w-full h-auto text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold">
                Offline Class Title
            </h1>
            
            {/* Location */}
            <p className="w-full h-auto text-sm text-gray-500 sm:text-base lg:text-lg">
                📍 <span className="font-medium">Location:</span> Example City, State, Country
            </p>

            {/* Timings */}
            <p className="w-full h-auto text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                🕒 <span className="font-medium">Timings:</span> 10:00 AM - 1:00 PM
            </p>

            {/* Class Days */}
            <p className="w-full h-auto text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                📅 <span className="font-medium">Class Days:</span> Monday, Wednesday, Friday
            </p>

            {/* Description */}
            <p style={{ whiteSpace: "pre-wrap" }} className="w-full h-auto mt-4 text-sm text-gray-500 sm:text-base lg:text-lg">
                This offline class provides hands-on experience with expert instructors. Perfect for students looking to enhance their skills in a focused, interactive environment.
            </p>

            {/* Topics Covered */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">Topics Covered</h2>
                <ul className="list-disc list-inside text-sm text-gray-600 sm:text-base lg:text-lg">
                    <li>Fundamentals of the Subject</li>
                    <li>Practical Applications</li>
                    <li>Interactive Group Activities</li>
                    <li>Q&A Sessions with the Instructor</li>
                </ul>
            </div>

            {/* Reviews */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">Student Reviews</h2>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg">
                    ⭐⭐⭐⭐ "The classes were amazing! Learned a lot and the instructor was very supportive." - Jane Doe
                </p>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                    ⭐⭐⭐⭐⭐ "Highly recommend these offline classes for anyone looking to gain practical knowledge." - John Smith
                </p>
            </div>

            {/* Contact Info */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">Contact Information</h2>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg">
                    📞 <span className="font-medium">Phone:</span> +123-456-7890
                </p>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                    📧 <span className="font-medium">Email:</span> class@example.com
                </p>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                    🌐 <span className="font-medium">Website:</span> www.exampleclass.com
                </p>
            </div>
        </div>
    );
}

export default SingleClass;
