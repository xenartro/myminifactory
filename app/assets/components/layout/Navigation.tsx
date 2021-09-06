import { FC } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation: FC = () => {
  return (
    <Nav className="flex-column">
      <Link to="/app" className="nav-link active">Home</Link>
      <a href="/logout" className="nav-link">Exit</a>
    </Nav>
  )
}

export default Navigation;
