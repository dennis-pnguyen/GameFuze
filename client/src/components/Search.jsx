import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameResults, setGameResults] = useState(null);

  function handleChange(e) {
    setSearchTerm(e.currentTarget.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let slug = searchTerm.split(' ').join('-').toLowerCase();
    setGameResults([]);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?search=${slug}&key=${apiKey}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!res.ok)
        throw new Error(`"Network response was NOT okay:", ${res.status} `);
      const searchResults = await res.json();
      searchResults === null
        ? alert('no games found!')
        : setGameResults(searchResults);
      console.log('search:', searchResults);
    } catch (error) {
      console.error(error.message);
    }
    setSearchTerm('');
  }

  if (gameResults !== null) {
    return (
      <>
        <Form onSubmit={handleSubmit} className="d-flex">
          <Form.Control
            value={searchTerm}
            onChange={handleChange}
            name="search"
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        <section>
          {gameResults === null
            ? 'Loading...'
            : gameResults.map((game) => {
                return (
                  <section>
                    <Link to={`/game-details/:gameId`}>
                      <ListGroup key={game.id} game={game} />
                    </Link>
                  </section>
                );
              })}
        </section>
      </>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        value={searchTerm}
        onChange={handleChange}
        name="search"
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}
