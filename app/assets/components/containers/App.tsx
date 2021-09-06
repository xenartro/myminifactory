import Navigation from '../layout/Navigation';
import UserList from '../users/List';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getToken } from '../../services/user';
import { Redirect } from 'react-router-dom';

const App: FC = () => {
  // Global container for the user's application.
  // Check for a stored token or otherwise redirect to the login.
  // TODO: add a context provider that validates the token and shows the app or redirects.
  const token = getToken();

  if (!token) {
    return <Redirect to="/" />
  }

  return (
    <Row>
      <Col md={2}><Navigation /></Col>
      <Col><UserList /></Col>
    </Row>
  )
}

export default App;
