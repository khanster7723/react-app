
import React from 'react';
import { Redirect } from 'react-router-dom';
//import logo from './logo.svg';
import '../../App.css';

//import { Cards, Chart, CountryPicker } from '../../components';
import styles from './Login.module.css';
//import { fetchData, fetchDataOfIndianState } from '../../api';

//import coronaImage from '../../images/image.png';

class Login extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("authToken");
        let loggedIn = true;
        if(token == null) {
            loggedIn = false;
        }
        this.state = {
            username: '',
            password: '',
            loggedIn: loggedIn
        }

    }

    onChange = (e) => {
        console.log("inside onchange");
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    submitForm = (e) => {
        console.log("inside onsubmit");
        e.preventDefault()
        const {username, password} = this.state;
        console.log("the username is: "+username);
        console.log("the password is: "+password);
        if(username === 'admin' && password === 'pass') {
            localStorage.setItem("authToken", "dkfsdiqqsruqincitoqowdkvfnfj")
            this.setState({
                loggedIn: true
            });
        }
    }
  
    render() {
        if(this.state.loggedIn) {
            return <Redirect to="/tracker"></Redirect>
        }
      return (
        <div className={styles.container}>
          <h1>Login</h1>
          <form onSubmit={this.submitForm}>
              <input type="text" placeholder="Enter username" name="username" value={this.state.username} onChange={this.onChange}></input>
              <br/>
              <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange}></input>
              <br/>
              <input type="submit" value="Submit"></input>
              <br/>
          </form>
        </div>
      )
    }
  }
  export default Login;