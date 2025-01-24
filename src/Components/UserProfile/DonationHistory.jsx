import React from 'react'
import BgOne from '../../assets/bg2.png'
import Navbar from '../Navbar'


function DonationHistory() {
    const donations = [
        {
            donation: "John Doe",
            date: "2025-01-24",
            transactionId: "TXN123456",
            amount: "$50.00",
            status: "Completed",
        },
        {
            donation: "Jane Smith",
            date: "2025-01-23",
            transactionId: "TXN654321",
            amount: "$75.00",
            status: "Pending",
        },
    ];

    return (
        <div className='w-full h-auto flex flex-col bg-[#fde3b6]'
            style={{
                backgroundImage: `url(${BgOne})`,
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
            }}
        >
            <div className="px-4 md:px-20 py-10 z-10 relative">
                <Navbar />
            </div>
            <div className='w-full h-auto flex flex-col mt-10 px-5 md:px-10 lg:px-20'>
                <div className='w-full h-auto flex justify-between items-center'>
                    <h1 className='font-prata text-lg font-semibold sm:text-xl md:text-2xl xl:text-3xl'>Donation History</h1>
                </div>
                <div className="container mx-auto p-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-black rounded-lg shadow-md">
                            <thead className="">
                                <tr className="text-left text-gray-600 uppercase text-xs">
                                    <th className="py-3 px-6">Donation</th>
                                    <th className="py-3 px-6">Date</th>
                                    <th className="py-3 px-6">Transaction ID</th>
                                    <th className="py-3 px-6">Amount</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation, index) => (
                                    <tr key={index} className="border-t border-black">
                                        <td className="py-3 px-6">{donation.donation}</td>
                                        <td className="py-3 px-6">{donation.date}</td>
                                        <td className="py-3 px-6">{donation.transactionId}</td>
                                        <td className="py-3 px-6">{donation.amount}</td>
                                        <td className="py-3 px-6">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${donation.status === "Completed"
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-yellow-200 text-yellow-700"
                                                    }`}
                                            >
                                                {donation.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonationHistory