// Fetch from API and display cards of the games we received
// Work to get pagination on this home page and display only a set amount
// Import bootstrap card component
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import image from '../images/cyberpunk-cover-art.jpeg';

const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [error, setError] = useState();

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
        console.log(gameData);
      } catch (error) {
        console.error(error.message);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGameData();
  }, []);

  // const gameList = data.map((game) => (
  //   <li key={game.id}>
  //     <Card style={{ width: '18rem' }}>
  //       <Card.Img variant="top" src={game.results.background_image} />
  //       <Card.Body>
  //         <Card.Title>{game.results.name}</Card.Title>
  //         <Card.Text>{game.results.released}</Card.Text>
  //       </Card.Body>
  //     </Card>
  //   </li>
  // ));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <div>Error! {error.message}</div>;
  }
  return (
    <>
      <ul>
        <li key="test">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>Cyberpunk 2077</Card.Title>
              <Card.Text>12-10-2020</Card.Text>
              <Button variant="primary">Go to game</Button>
            </Card.Body>
          </Card>
        </li>
      </ul>
    </>
  );
}
