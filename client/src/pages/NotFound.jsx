import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="Header-content">
      <div className="row">
        <div className="col text-center mb-5">
          <h3>We could not find the page you were looking for!</h3>
          <p className="text-muted">
            <Link to="/home">Return to the Home page.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
