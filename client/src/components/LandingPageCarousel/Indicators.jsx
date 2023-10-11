import { FaRegCircle, FaCircle } from 'react-icons/fa';

export default function Indicators({ count, current, onSelect }) {
  const buttons = [];
  for (let i = 0; i < count; i++) {
    buttons.push(
      i === current ? (
        <FaCircle
          key={i}
          onClick={() => onSelect(i)}
          className="progress-dot"
        />
      ) : (
        <FaRegCircle
          key={i}
          onClick={() => onSelect(i)}
          className="progress-dot"
        />
      )
    );
  }

  return (
    <div style={{ display: 'none' }} className="progress-dots">
      {buttons}
    </div>
  );
}
