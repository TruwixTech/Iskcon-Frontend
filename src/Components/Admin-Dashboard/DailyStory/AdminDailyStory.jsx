import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminDailyStory() {
    const [createStoryPopup, setCreateStoryPopup] = useState(false);
    const [stories, setStories] = useState([
        { title: '', description: '', image: null }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Add a new story input group
    const addStory = () => {
        setStories([...stories, { title: '', description: '', image: null }]);
    };

    // Handle changes in the input fields
    const handleChange = (index, field, value) => {
        const updatedStories = [...stories];
        updatedStories[index][field] = value;
        setStories(updatedStories);
    };

    // Handle file input
    const handleFileChange = (index, file) => {
        const updatedStories = [...stories];
        updatedStories[index].image = file;
        setStories(updatedStories);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();

        // Append stories as plain text
        stories.forEach((story, index) => {
            formData.append(`titles[]`, story.title);
            formData.append(`descriptions[]`, story.description);
            if (story.image) {
                formData.append(`images`, story.image); // This matches `upload.array('images')`
            }
        });

        try {
            const response = await axios.post(`${backend}/admin/daily-story/create`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                toast.success('Daily stories created successfully!');
                setStories([{ title: '', description: '', image: null }]);
                setCreateStoryPopup(false);
            } else {
                toast.error(response.data.message || 'Failed to create daily stories.');
            }
        } catch (error) {
            console.error('Error creating daily stories:', error);
            toast.error('An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className='w-full h-auto flex flex-col items-center min-h-screen'>
            <h1 className='text-center text-4xl font-semibold my-3'>Admin Daily Story Section</h1>

            {/* Trigger Popup */}
            <button
                onClick={() => setCreateStoryPopup(true)}
                className='px-5 py-2 border text-yellow-500 rounded-md my-6 active:bg-yellow-600 active:text-white font-medium border-yellow-500 hover:bg-yellow-600 duration-300 ease-in-out hover:text-white cursor-pointer'
            >
                Create A Daily Story
            </button>

            {/* Popup Form */}
            {createStoryPopup && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 max-h-screen rounded-md w-96 md:w-1/2 shadow-xl overflow-y-scroll' style={{
                        scrollbarWidth: 'none'
                    }}>
                        <div className='flex justify-between mb-6'>
                            <h2 className='text-xl font-bold'>Create Daily Stories</h2>
                            <button
                                onClick={() => { setCreateStoryPopup(false); setStories([{ title: '', description: '', image: null }]) }}
                                className='text-xl text-red-500 hover:text-red-700'
                            >
                                X
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-4' encType="multipart/form-data">
                            {stories.map((story, index) => (
                                <div key={index} className='border-b pb-4 mb-4'>
                                    <input
                                        type='text'
                                        placeholder='Title'
                                        value={story.title}
                                        onChange={(e) => handleChange(index, 'title', e.target.value)}
                                        className='border p-2 rounded-md w-full mb-2'
                                        required
                                    />
                                    <textarea
                                        placeholder='Description'
                                        value={story.description}
                                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        className='border p-2 rounded-md w-full mb-2 resize-none h-32'
                                        required
                                    />
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                                        className='border p-2 rounded-md w-full'
                                        required
                                    />
                                </div>
                            ))}

                            {/* Add More Story Button */}
                            <button
                                type='button'
                                onClick={addStory}
                                className='text-blue-600 underline mb-4'
                            >
                                + Add Another Story
                            </button>

                            {/* Submit Button */}
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300'
                            >
                                {isSubmitting ? 'Creating...' : 'Create Stories'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDailyStory;
