import { Alert, Button, Form } from 'react-bootstrap';
import { ChangeEvent, FC, useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../services/user';

const Register: FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({ username: '', password: '' });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError('');
    setSubmitting(true);

    try {
      await register(data.username, data.password);

      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error');
    }

    setSubmitting(false);
  }

  return (
    <div>
      <h1 className="h2">Register</h1>

      {error !== '' && <Alert variant="danger">{error}</Alert>}

      {!success && (
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
          <Button variant="primary" type="submit" disabled={submitting}>Submit</Button>
        </Form>
      )}

      {success && (
        <>
          <Alert variant="success">Successfully registered as <strong>{data.username}</strong></Alert>

          <Link to="/login"><Button variant="primary" className="me-2">Login</Button></Link>
          <Link to="/"><Button variant="secondary">Go back</Button></Link>
        </>
      )}
    </div>
  )
}

export default Register;
