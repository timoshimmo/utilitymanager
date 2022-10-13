import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import './assets/main.css';
import RoutesComponent from './lib/routes';
import { history } from './helpers/history';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <RoutesComponent />
        </Router>
      </div>
    );
  }
}
