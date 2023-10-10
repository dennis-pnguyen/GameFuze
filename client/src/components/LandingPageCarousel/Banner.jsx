export default function CarouselBanner({ image }) {
  return (
    <div className="image-wrapper">
      <img src={image} alt={image} />
    </div>
  );
}
