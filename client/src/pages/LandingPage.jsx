import Carousel from '../components/LandingPageCarousel/Carousel';
const images = ['../images/cyberpunk-cover-art.jpeg'];

export default function Landing() {
  return (
    <>
      <Carousel images={images} />
    </>
  );
}
