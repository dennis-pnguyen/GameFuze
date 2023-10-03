import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signIn, signUp } from '../lib';

export default function RegistrationForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
    async function handleSignUp(username, password) {
      await signUp(username, password);
      navigate('/sign-in');
    }
    async function handleSignIn(username, password) {
      const auth = await signIn(username, password);
      if (auth.user && auth.token) {
        onSignIn(auth);
      }
    }
    event.preventDefault();
    if (event.currentTarget === null) throw new Error();
    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    const username = entries.username;
    const password = entries.password;
    try {
      if (action === 'sign-up') {
        handleSignUp(username, password);
      } else {
        handleSignIn(username, password);
      }
    } catch (err) {
      setError(err);
    }
  }

  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateText =
    action === 'sign-up' ? 'Sign in instead' : 'Register now';
  const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          name="fullName"
          required={true}
          type="text"
          placeholder="Enter your name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
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
          name="username"
          required={true}
          type="name"
          placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          required={true}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          required={true}
          type="checkbox"
          label="Agree to terms & conditions"
        />
      </Form.Group>
      <div>
        <small>
          <Link className="text-muted" to={alternateActionTo}>
            {alternateText}
          </Link>
        </small>
      </div>
      <div>
        <Button variant="primary" type="submit">
          {submitButtonText}
        </Button>
      </div>
      <>
        {error && (
          <div style={{ color: 'red' }}>
            Error: {error instanceof Error ? error.message : 'Unknown Error'}
          </div>
        )}
      </>
    </Form>
  );
}
