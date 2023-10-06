// Fetch from API and display cards of the games we received
// Work to get pagination on this home page and display only a set amount
// Import bootstrap card component
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
// import GameDetails from './GameDetails';
const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // useEffect to fetch game data from API
  useEffect(() => {
    async function fetchGameData() {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?token&key=${apiKey}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok)
          throw new Error(
            `'Network response was NOT okay:', ${response.status}`
          );
        const gameData = await response.json();
        setGames(gameData.results);
        console.log(gameData.results);
      } catch (error) {
        console.error(error.message);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGameData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <div>Error! {error.message}</div>;
  }

  // handleDetailsClick for gameDetails to grab 'data-gamekey' id
  function handleDetailsClick(gameId) {
    navigate(`/game-details/${gameId}`);
    console.log(`Game with id ${gameId} was clicked.`);
  }

  return (
    <>
      <div>
        <h2 style={{ margin: '3rem' }}>Home</h2>
      </div>
      <div className="container">
        <div
          style={{ justifyContent: 'space-evenly' }}
          className="row"
          id="card-container">
          {games.map((game) => (
            <Card
              className="shadow-sm"
              key={game.id}
              style={{ width: '18rem' }}>
              <Card.Img
                src={game.background_image}
                variant="top"
                alt={game.name}
              />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>{('Release date:', game.released)}</Card.Text>
                <Card.Link
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDetailsClick(game.id)}>
                  Details
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
