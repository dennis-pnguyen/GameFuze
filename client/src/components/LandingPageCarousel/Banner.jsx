export default function CarouselBanner({ image }) {
  return (
    <div className="image-wrapper">
      <img
        style={{
          objectFit: 'contain',
          height: '600px',
          width: '600px',
        }}
        src={image}
        alt={image}
      />
    </div>
  );
}
