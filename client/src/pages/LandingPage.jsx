import Carousel from '../components/LandingPageCarousel/Carousel';
import Button from 'react-bootstrap/Button';
const images = [
  '/images/black-and-white-control.avif',
  '/images/computer-room.avif',
  '/images/ps5-controllers.avif',
  '/images/game-over.avif',
  '/images/retro-setup.avif',
];

export default function Landing() {
  return (
    <>
      <Carousel images={images} />
      <div>
        <Button href="/home" variant="secondary">
          Enter
        </Button>
      </div>
    </>
  );
}
