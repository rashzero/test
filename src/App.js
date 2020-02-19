import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import User from './User';
import Statistic from './Statistic';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import './App.scss';

function App() {
  return (
    <Router>
      <Grid container direction="row">
        <Header />
        <Grid item xs={12}>
        
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/statistic/:page" component={Statistic} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </Grid>
      </Grid>
    </Router>
    
  );
}

export default App;
