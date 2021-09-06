import { Button } from 'react-bootstrap';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Index: FC = () => {
  return (
    <div>
      <h1 className="h2">Welcome to MyMiniFactory coding challenge</h1>

      <Link to="/login"><Button variant="secondary" className="me-2">Login</Button></Link>
      <Link to="/register"><Button variant="secondary">Register</Button></Link>
    </div>
  )
}

export default Index;
