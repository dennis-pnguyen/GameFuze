import { useState, useEffect } from 'react';
import Image from '../images/cyberpunk-cover-art.jpeg';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
const apiKey = import.meta.env.VITE_API_KEY;

export default function GameDetails() {
  const { gameId } = useParams();
  console.log('gameDetails,', gameId);
  const [gameDetails, setGameDetails] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(details);
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
  // if (error)
  //   return (
  //     <div>
  //       Error Loading Game Details {gameId}:{''}
  //       {error instanceof Error ? error.message : 'Unknown Error'}
  //     </div>
  //   );

  if (!gameDetails) return null;

  return (
    <div style={{ marginTop: '5rem' }} className="container-xl">
      <div className="row">
        <div className="col-md-6">
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
              src={Image}
            />
          </div>

          <div>
            <Button variant="success">Add to Wishlist</Button>
            <Button variant="primary">Write a Review</Button>
          </div>
          <div className="col">
            <p className="h4">About</p>
            <p className="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Senectus et netus et malesuada fames ac turpis egestas. Rutrum
              quisque non tellus orci ac auctor augue mauris augue. Mauris a
              diam maecenas sed enim. Hac habitasse platea dictumst vestibulum.
              Enim facilisis gravida neque convallis a cras. Laoreet sit amet
              cursus sit amet dictum sit amet. Mattis nunc sed blandit libero
              volutpat sed cras. At urna condimentum mattis pellentesque id
              nibh. Morbi tristique senectus et netus et malesuada fames ac. Id
              faucibus nisl tincidunt eget nullam non nisi est sit. Sagittis
              purus sit amet volutpat consequat mauris nunc congue. Eu sem
              integer vitae justo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
