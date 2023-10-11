import Card from 'react-bootstrap/Card';
import { FaTrashCan } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const [error, setError] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const req = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('/api/Wishlist', req);
        if (!response.ok)
          throw new Error(`Network repsonse was NOT okay:, ${response.status}`);
        const wishlistItems = await response.json();
        setWishlist(wishlistItems);
      } catch (error) {
        console.error(error.message);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  async function removeEntry() {
    const req = { method: 'DELETE' };
    const res = await fetch('/api/Wishlist', req);
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      await removeEntry();
    } catch (err) {
      alert(`Error deleting entry: ${err}`);
    } finally {
      setIsLoading(false);
      alert('Game removed from wishlist!');
      navigate('/home');
    }
  }

  function handleDetailsClick(gameId) {
    navigate(`/game-details/${gameId}`);
    console.log(`Game with id ${gameId} was clicked.`, event.target.value);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <>
      <div>
        <h2 style={{ margin: '3rem' }}>Wishlist</h2>
      </div>
      <div className="container">
        <div
          style={{ justifyContent: 'space-evenly' }}
          className="row"
          id="card-container">
          {wishlist.map((game) => (
            <Card
              className="shadow-sm"
              key={game.gameId}
              style={{ width: '18rem' }}>
              <Card.Img
                src={game.backgroundImage}
                variant="top"
                alt={game.name}
              />
              <Card.Body>
                <Card.Title>{game.gameName}</Card.Title>
                <Card.Text>
                  Release date: {new Date(game.released).toLocaleDateString()}
                </Card.Text>
                <Card.Link
                  onClick={() => handleDetailsClick(game.gameId)}
                  style={{ cursor: 'pointer' }}>
                  Details
                </Card.Link>
              </Card.Body>
              <FaTrashCan onClick={handleDelete} />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
