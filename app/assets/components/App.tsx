import * as React from 'react';
import Index from './containers/Index';
import Register from './containers/Register';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact><Index /></Route>
        <Route path="/register" exact><Register /></Route>
      </Switch>
    </Router>
  )
}

export default App;
