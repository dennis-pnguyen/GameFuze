import CarouselBanner from './Banner';
import Indicators from './Indicators';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import { useState, useEffect, useCallback } from 'react';
import '../../Carousel.css';

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images]);

  useEffect(() => {
    const timeoutId = setTimeout(handleNext, 4000);
    return () => clearTimeout(timeoutId);
  }, [handleNext]);

  function handlePrev() {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  }

  return (
    <div className="carousel">
      <PrevButton onPrevClick={handlePrev} />
      <CarouselBanner image={images[currentIndex]} />
      <NextButton onNextClick={handleNext} />
      <Indicators
        count={images.length}
        current={currentIndex}
        onSelect={(i) => setCurrentIndex(i)}
      />
    </div>
  );
}
