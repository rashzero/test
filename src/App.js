import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import User from './User';
import Statistic from './Statistic';
import Header from './Header';
import './css/App.scss';

function App() {
  return (
    <Router>
      <Header />
        
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/statistic/:page">
          <Statistic />
        </Route>
        <Route path="/user/:id">
          <User />
        </Route> 
      </Switch>
    </Router>
  );
}

export default App;
