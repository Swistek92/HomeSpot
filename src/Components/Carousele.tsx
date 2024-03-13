import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const Carousele: React.FC<CarouseleProps> = ({ imgs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const autoSlideTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    resetAutoSlideTimer();

    return () => {
      if (autoSlideTimeout.current) {
        clearTimeout(autoSlideTimeout.current);
      }
    };
  }, [currentIndex]);

  const resetAutoSlideTimer = () => {
    if (autoSlideTimeout.current !== null) {
      clearTimeout(autoSlideTimeout.current);
    }
    autoSlideTimeout.current = window.setTimeout(() => {
      goToNext();
    }, 2000);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imgs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imgs.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (carouselRef.current) {
      carouselRef.current.requestFullscreen();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    onTap: () => handleFullScreen(),
  });

  return (
    <div
      className='flex flex-col items-center justify-center'
      {...handlers}
      onDoubleClick={handleFullScreen}
    >
      <div className='relative' ref={carouselRef}>
        <img
          src={imgs[currentIndex]}
          alt='Carousel slide'
          className='w-full h-auto'
          onMouseEnter={() => clearTimeout(autoSlideTimeout.current)}
          onMouseLeave={resetAutoSlideTimer}
        />
        <button
          onClick={goToPrevious}
          className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-4'
        >
          {"<<<"}
        </button>
        <button
          onClick={goToNext}
          className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-4'
        >
          {">>>"}
        </button>
        <button
          onClick={handleFullScreen}
          className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2'
        >
          Pełny ekran
        </button>
      </div>
    </div>
  );
};

export default Carousele;
