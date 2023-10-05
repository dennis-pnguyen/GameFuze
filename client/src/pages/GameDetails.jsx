import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const apiKey = import.meta.env.VITE_API_KEY;

export default function GameDetails() {
  const params = useParams();
  const gameId = params.gameDetails.id;
  const [gameDetails, setGameDetails] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGameDetails() {
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
    }
    fetchGameDetails();
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
    <div className="container-fluid">
      <div>
        <p className="h1">Name of Game</p>
      </div>
      <div>
        <img className="image" />
      </div>
      <div className="col-12 col-sm-6 col-md-7">
        <p className="h5">About</p>
        <p classnName="text-secondary">Game description goes here</p>
      </div>
      <div className="row">
        <div className="col">
          <p className="h3">Long description goes here</p>
        </div>
      </div>
    </div>
  );
}
