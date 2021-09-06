import { FC } from 'react';
import Index from './containers/Index';
import Login from './containers/Login';
import Register from './containers/Register';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact><Index /></Route>
        <Route path="/register" exact><Register /></Route>
        <Route path="/login" exact><Login /></Route>
      </Switch>
    </Router>
  )
}

export default App;
