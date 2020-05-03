
import React from 'react';
//import logo from './logo.svg';
import '../../App.css';

import { Cards, Chart, CountryPicker } from '../../components';
import styles from './Tracker.module.css';
import { fetchData, fetchDataOfIndianState } from '../../api';

import coronaImage from '../../images/image.png';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("authToken");

    let loggedIn = true;

    if(token == null) {
      loggedIn= false;
    }

    this.state = {
      data: {},
      country: '',
      state: '',
      loggedIn
    }
  }
  
    async componentDidMount() {
      console.log("inside componentdidmount of tracker");
      if(this.state.loggedIn) {
      const fetchedData = await fetchData();
      this.setState({
        data: fetchedData
      })
    }
    }
  
    handleCountryChange = async (country) => {
      const fetchedData = await fetchData(country);
      console.log(fetchedData);
      //console.log(country);
      //fetch the data
      //change the state
      this.setState({
        data: fetchedData,
        country: country,
        state: ''
      })
    }
  
    handleIndianStateChange = async (state) => {
      const fetchedData = await fetchDataOfIndianState(state);
      //console.log(fetchedData);
      //console.log(country);
      //fetch the data
      //change the state
      this.setState({
        data: fetchedData,
        state: state
      })
      console.log(state);
    }

    logout = () => {
      console.log("inside logut button click function");
      localStorage.removeItem("authToken");
      this.setState({
        loggedIn: false
      })
    }
  
    render() {
      console.log("inside render method of tracker");
      if(this.state.loggedIn === false) {
        return <Redirect to="/"></Redirect>
      }
      const { data, country, state } = this.state;
      return (
        <div className={styles.container}>
          <div className={styles.trackerheader}>
          <img className={styles.image} src={coronaImage} alt="COVID-19"></img>
          <Button onClick={this.logout} className={styles.logout}>Log Out</Button>
          </div>
          <Cards data={data} country={country} state={state}></Cards>
          <CountryPicker country={country} handleCountryChange={this.handleCountryChange} handleIndianStateChange={this.handleIndianStateChange}></CountryPicker>
          <Chart data={data} country={country}></Chart>
        </div>
      )
    }
  }
  export default Tracker;