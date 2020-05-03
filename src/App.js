import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

import Tracker from './components/Tracker/Tracker';
import Login from './components/Login/Login';

//import { Cards, Chart, CountryPicker } from './components';
//import styles from './App.module.css';
//import { fetchData, fetchDataOfIndianState } from './api';

//import coronaImage from './images/image.png';

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/tracker" component={Tracker}></Route>
      </Switch>
    )
  }
}
export default App;
