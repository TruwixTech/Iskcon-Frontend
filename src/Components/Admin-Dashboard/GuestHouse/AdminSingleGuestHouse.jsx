import React from 'react';

function AdminSingleGuestHouse() {
    return (
        <div className="w-full h-auto flex flex-col my-10 px-5 md:px-10 lg:px-20">
            {/* Guest House Image */}
            <img 
                src="" 
                alt="Guest House Image" 
                className="w-full h-40 rounded-lg bg-gray-200 sm:h-60 md:h-80 lg:h-[400px] xl:h-[450px]" 
            />
            
            {/* Guest House Title */}
            <h1 className="my-4 lg:my-6 w-full h-auto text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold">
                Sample Guest House Title
            </h1>
            
            {/* Location */}
            <p className="w-full h-auto text-sm text-gray-500 sm:text-base lg:text-lg">
                📍 <span className="font-medium">Location:</span> Example City, State, Country
            </p>

            {/* Description */}
            <p style={{ whiteSpace: "pre-wrap" }} className="w-full h-auto mt-4 text-sm text-gray-500 sm:text-base lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. This guest house offers a perfect blend of comfort and convenience. Whether you’re here for a short stay or a long vacation, enjoy spacious rooms and top-notch amenities.
            </p>

            {/* Room Details */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">Room Details</h2>
                <ul className="list-disc list-inside text-sm text-gray-600 sm:text-base lg:text-lg">
                    <li>Deluxe Rooms with King-Size Beds</li>
                    <li>Air Conditioning and Heating</li>
                    <li>En-suite Bathrooms with Hot Water</li>
                    <li>Complimentary Wi-Fi</li>
                    <li>TV with Streaming Services</li>
                </ul>
            </div>

            {/* Amenities */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">Amenities</h2>
                <ul className="list-disc list-inside text-sm text-gray-600 sm:text-base lg:text-lg">
                    <li>On-site Parking</li>
                    <li>Complimentary Breakfast</li>
                    <li>Swimming Pool</li>
                    <li>24/7 Front Desk Support</li>
                    <li>Beautiful Garden and Lounge Area</li>
                </ul>
            </div>

            {/* Reviews */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">Guest Reviews</h2>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg">
                    ⭐⭐⭐⭐ "A wonderful stay! The rooms were clean, and the staff was friendly. Highly recommend this guest house!" - Jane Doe
                </p>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                    ⭐⭐⭐⭐⭐ "Amazing experience with top-class amenities. Would love to visit again." - John Smith
                </p>
            </div>

            {/* Contact Info */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">Contact Information</h2>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg">
                    📞 <span className="font-medium">Phone:</span> +123-456-7890
                </p>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                    📧 <span className="font-medium">Email:</span> guesthouse@example.com
                </p>
                <p className="text-sm text-gray-500 sm:text-base lg:text-lg mt-2">
                    🌐 <span className="font-medium">Website:</span> www.exampleguesthouse.com
                </p>
            </div>
        </div>
    );
}

export default AdminSingleGuestHouse;
