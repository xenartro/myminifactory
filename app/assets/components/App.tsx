import AppContainer from './containers/App';
import Index from './containers/Index';
import Login from './containers/Login';
import Register from './containers/Register';
import { FC } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact><Index /></Route>
        <Route path="/register" exact><Register /></Route>
        <Route path="/login" exact><Login /></Route>
        <Route path="/app" exact><AppContainer /></Route>
      </Switch>
    </Router>
  )
}

export default App;
