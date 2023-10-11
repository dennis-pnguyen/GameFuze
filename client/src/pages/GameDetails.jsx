import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
const apiKey = import.meta.env.VITE_API_KEY;

export default function GameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // API call to get gameDetails of specific game
  useEffect(() => {
    async function fetchGameDetails(gameId) {
      try {
        const req = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(
          `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`,
          req
        );
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        const details = await res.json();
        setGameDetails(details);
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (gameId) {
      setIsLoading(true);
      fetchGameDetails(gameId);
    }
  }, [error, gameId]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Game Details {gameId}:{''}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  if (!gameDetails) return null;

  async function addToWishlist() {
    try {
      const response = await fetch('/api/Wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameDetails),
      });
      if (!response.ok)
        throw new Error(`Network response was NOT okay: ${response.status}`);
      const wishlistGame = await response.json();
      navigate('/wishlist');
      return wishlistGame;
    } catch (error) {
      console.error(error.message);
      setError(error);
    }
  }

  return (
    <div style={{ marginTop: '5rem' }} className="container-xl">
      <div id={gameDetails.id} className="col">
        <p className="h1">{gameDetails.name}</p>
        <div>
          <img
            style={{
              objectFit: 'contain',
              height: '500px',
              width: '500px',
            }}
            className="image"
            fluid="true"
            src={gameDetails.background_image}
          />
        </div>
        <div>
          Platforms:
          {gameDetails.parent_platforms.map((platform) => (
            <div key={platform.platform.id} style={{ fontWeight: 'bold' }}>
              {platform.platform.name}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem' }}>
          Genres:{' '}
          {gameDetails.genres.map((genre) => (
            <div key={genre.id} style={{ fontWeight: 'bold' }}>
              {genre.name}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem' }}>
          Ratings:
          <p style={{ marginBottom: '0rem' }}>
            ESRB: {gameDetails.esrb_rating.name}
          </p>
          <p>Metacritic Score: {gameDetails.metacritic}</p>
          <p>RAWG: {gameDetails.rating}</p>
        </div>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Button onClick={addToWishlist} variant="success">
            Add to Wishlist
          </Button>
          <Button variant="primary">Write a Review</Button>
        </div>
        <div className="col">
          <p className="h4">About</p>
          <p className="text-secondary">{gameDetails.description_raw}</p>
        </div>
      </div>
    </div>
  );
}
