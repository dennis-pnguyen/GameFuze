import { FaChevronRight } from 'react-icons/fa';

export default function NextButton({ onNextClick }) {
  return (
    <FaChevronRight
      style={{ display: 'none' }}
      onClick={onNextClick}
      className="next-image"
    />
  );
}
