import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home/';
import Footer from './components/Footer/';
import NotFound from './components/NotFound/';
import './assets/scss/style.scss';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  </Router>,
  document.getElementById('root')
)
