import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
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
      const res = await fetch('/api/sign-up', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const user = await res.json;
      alert(`Registered!`, user);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
      setFullName('');
      setEmail('');
      setUsername('');
      setPassword('');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          name="fullName"
          required={true}
          type="text"
          placeholder="Enter your name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          required={true}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          required={true}
          type="name"
          placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          required={true}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <div>
        <Button disabled={isLoading} variant="primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
}
