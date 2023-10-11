import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const { user, token } = await res.json();
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full d-flex justify-between">
          <h2>Sign In</h2>
        </div>
      </div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="name" placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" />
        </Form.Group>
        <Button disabled={isLoading} variant="light" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}
