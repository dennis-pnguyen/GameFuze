// Fetch from API and display cards of the games we received
// Work to get pagination on this home page and display only a set amount
// Import bootstrap card component
import { useEffect, useState } from 'react';
// import Card from 'react-bootstrap/Card';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // const [gameData, setGameData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchGameData() {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?token&key=92352aa464cd41358d57101c4fe18518`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // token: '92352aa464cd41358d57101c4fe18518',
            },
          }
        );
        if (!response.ok)
          throw new Error(
            `'Network response was NOT okay:', ${response.status}`
          );
        const gameData = await response.json();
        console.log('value:', gameData);
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
      <ul>hello</ul>
    </>
  );
}
