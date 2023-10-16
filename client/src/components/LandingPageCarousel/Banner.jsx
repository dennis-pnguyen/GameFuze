export default function CarouselBanner({ image }) {
  return (
    <div className="image-wrapper">
      <img
        style={{
          objectFit: 'contain',
          height: '100%',
          width: '100%',
        }}
        src={image}
        alt={image}
      />
    </div>
  );
}
