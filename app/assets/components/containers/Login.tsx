import { Alert, Button, Form } from 'react-bootstrap';
import { ChangeEvent, FC, useState, SyntheticEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../services/user';

const Login: FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({ username: '', password: '' });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError('');
    setSubmitting(true);

    try {
      await login(data.username, data.password);

      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error');
    }

    setSubmitting(false);
  }

  if (success) {
    return <Redirect to="/app" />
  }

  return (
    <div>
      <h1 className="h2">Log in to your account</h1>

      {error !== '' && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your user name"
            value={data.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, username: e.currentTarget.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.currentTarget.value })}
            required
          />
        </Form.Group>
        <Link to="/"><Button variant="secondary" className="me-2">Cancel</Button></Link>
        <Button variant="primary" type="submit" disabled={submitting || success}>Login</Button>
      </Form>
    </div>
  )
}

export default Login;
