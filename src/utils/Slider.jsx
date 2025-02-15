import React, { useEffect, useState } from 'react'
import Image from '../assets/signUpImage.jpg'


function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousal = [
        {
            id: 1,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
        {
            id: 2,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
        {
            id: 3,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
        {
            id: 4,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
    ];

    // Auto-slide logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === carousal.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change slides every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [carousal.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    return (
        <div className='w-full h-auto flex flex-col sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] md:h-screen'>
            <div className='w-full h-auto flex overflow-hidden relative md:h-full'>
                <div className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {
                        carousal.map((item, index) => (
                            <div key={index} className='min-w-full h-auto relative flex '>
                                <img src={item.image} key={index} alt="item image" className='w-full h-full object-cover' />
                                <p className='text-[#ECA242] font-poppins text-center px-10 absolute bottom-20 text-lg'>{item.title}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full h-auto flex flex-col absolute bottom-10 gap-7'>
                    <div className='w-full h-auto flex justify-center items-center'>
                        {carousal.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-3 w-3 rounded-full mx-1 ${currentIndex === index ? 'bg-[#EB852C]' : 'bg-gray-300'
                                    }`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider