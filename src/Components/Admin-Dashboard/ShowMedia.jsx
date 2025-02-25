import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { MdDelete } from "react-icons/md";


const backend = import.meta.env.VITE_BACKEND_URL;

const ShowMedia = () => {
    const [media, setMedia] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedType, setSelectedType] = useState('all');
    const navigate = useNavigate();

    // Date handling functions
    const handlePreviousDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNextDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Media filtering logic
    const parseCreatedAt = (dateString) => {
        const [day, month, year] = dateString.split(' ')[0].split('-');
        return new Date(year, month - 1, day);
    };

    const isSameDate = (date1, date2) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    // Get unique types from media
    const mediaTypes = [...new Set(media.map(item => item.type))];

    const filteredMedia = media.filter(item =>
        isSameDate(parseCreatedAt(item.createdAt), selectedDate) &&
        (selectedType === 'all' || item.type === selectedType)
    );

    // Data fetching
    async function getAllMedia() {
        try {
            const response = await axios.get(`${backend}/admin/media/get`);
            setMedia(response.data.data);
        } catch (error) {
            console.log("Error while fetching media", error);
        }
    }

    //delete media 
    async function deleteSingleMedia(id) {
        try {
            await axios.delete(`${backend}/admin/media/delete`, {
                data: { mediaId: id }
            });
            getAllMedia()
            alert("Media deleted successfully!");
        } catch (error) {
            console.log("Error while fetching media", error);
        }
    }

    useEffect(() => {
        getAllMedia();
    }, []);


    return (
        <div className='w-full h-[450px] flex flex-col gap-3 overflow-y-scroll px-5 py-5 bg-white rounded-3xl'>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-end">
                {/* Date Navigation */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePreviousDate}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        ←
                    </button>
                    <span className="text-lg font-medium">
                        {formatDate(selectedDate)}
                    </span>
                    <button
                        onClick={handleNextDate}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        →
                    </button>
                </div>

                {/* Type Selector */}
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white"
                >
                    <option value="all">All Types</option>
                    {mediaTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            {/* Media Display */}
            <div className='w-full h-auto gap-4 lg:gap-6 grid grid-cols-1 place-content-center'>
                {filteredMedia.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No media found for {formatDate(selectedDate)} {selectedType !== 'all' && `of type ${selectedType}`}
                    </p>
                ) : (
                    filteredMedia.map((mediaItem) => (
                        <div key={mediaItem._id} className="flex flex-col gap-4 mb-8">
                            <div className='w-full h-auto flex justify-between items-center'>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-semibold">{mediaItem.title}</h2>
                                    <span className="text-sm text-gray-500">{mediaItem.type}</span>
                                </div>
                                <div className='w-auto h-auto'>
                                    <MdDelete size={30} className='text-red-500 cursor-pointer' onClick={() => deleteSingleMedia(mediaItem._id)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {mediaItem.image.map((imgUrl, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img
                                            src={imgUrl}
                                            alt={`${mediaItem.title} ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ShowMedia
