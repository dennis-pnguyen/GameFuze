import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      localStorage.setItem('token', token);
      if (token) navigate('/');
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function guestLogin() {
    try {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'guest', password: 'password1' }),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      if (token) navigate('/home');
      console.log('Logged in', user, '; received token:', token);
      alert('Logged in as GUEST');
    } catch (err) {
      alert(`Invalid login.`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full d-flex space-around">
          <h2>Sign In</h2>
        </div>
      </div>
      <div className="row">
        <div>
          Not registered? <a href="/register">Register for an account</a>
        </div>
        <div>or</div>
        <div>
          <a href="#" onClick={guestLogin}>
            Continue as GUEST{' '}
          </a>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
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
    </div>
  );
}
