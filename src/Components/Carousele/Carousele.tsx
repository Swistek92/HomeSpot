import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

const Carousele: React.FC<CarouseleProps> = ({ imgs, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const autoSlideTimeout = useRef<number | undefined>(undefined);
  const [fullScreen, setFullScren] = useState<boolean>(false);
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
      setFullScren(false);
      document.exitFullscreen();
    } else if (carouselRef.current) {
      carouselRef.current.requestFullscreen();
      setFullScren(true);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    onTap: () => handleFullScreen(),
  });

  return (
    <div
      className={`flex flex-col items-center justify-center  ${
        className || ""
      }`}
      {...handlers}
      onDoubleClick={handleFullScreen}
    >
      <div className='relative ' ref={carouselRef}>
        <img
          src={imgs[currentIndex]}
          alt='Carousel slide'
          className='w-full h-full	'
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
          {fullScreen ? "zamknij pełny ekran" : "pelny ekran"}
        </button>
      </div>
    </div>
  );
};

export default Carousele;
