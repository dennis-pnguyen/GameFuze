// Fetch from API and display cards of the games we received
// Work to get pagination on this home page and display only a set amount
// Import bootstrap card component
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [error, setError] = useState();

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

  return (
    <>
      <div>
        <h2 style={{ margin: '3rem' }}>Home</h2>
      </div>
      <div className="container">
        <div className="row" id="card-container">
          {games.map((game) => (
            <div className="col-md-4" key={game.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  src={game.background_image}
                  variant="top"
                  alt={game.name}
                />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Text>{(`Release date:`, game.released)}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
