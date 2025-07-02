import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const Carousel = () => {
    const images = ['/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg'];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState('right');

    const timeoutRef = useRef(null);

    const changeSlide = (nextIndex, dir = 'right') => {
        if (nextIndex === currentIndex) return;

        setPrevIndex(currentIndex);
        setCurrentIndex(nextIndex);
        setDirection(dir);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setPrevIndex(null);
        }, 1000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const next = (currentIndex + 1) % images.length;
            changeSlide(next, 'right');
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handlePrev = () => {
        const next = (currentIndex - 1 + images.length) % images.length;
        changeSlide(next, 'left');
    };

    const handleNext = () => {
        const next = (currentIndex + 1) % images.length;
        changeSlide(next, 'right');
    };

    return (
        <div className='carousel'>
            <button className='carousel-button left' onClick={handlePrev}>
                ❮
            </button>
            <button className='carousel-button right' onClick={handleNext}>
                ❯
            </button>

            {images.map((img, index) => {
                let className = 'carousel-image';

                if (index === currentIndex) {
                    className += direction === 'right' ? ' slide-in' : ' slide-in-left';
                } else if (index === prevIndex) {
                    className += direction === 'right' ? ' slide-out' : ' slide-out-left';
                } else {
                    className += ' hidden';
                }

                return <img key={index} src={img} alt={`slide-${index}`} className={className} />;
            })}
        </div>
    );
};

export default Carousel;
