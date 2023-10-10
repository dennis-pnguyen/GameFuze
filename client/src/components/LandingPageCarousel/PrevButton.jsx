import { FaChevronLeft } from 'react-icons/fa';

export default function PrevButton({ onPrevClick }) {
  return (
    <FaChevronLeft
      style={{ display: 'none' }}
      onClick={onPrevClick}
      className="previous-image"
    />
  );
}
