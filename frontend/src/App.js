/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoginStatus } from './actions/userActions';
import { userConstants } from './constants/userConstants';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.getLoginStatus();
  }
  
  // This render will show null (blank screen) until the fetch action returns a value for login_status
  render() {
    return (
    <div className="App">
      {this.props.login_status === userConstants.LOGGED_IN ? <HomePage/> : null} 
      {this.props.login_status === userConstants.LOGGED_OUT ? <LoginPage/> : null} 
    </div>
    );
  }
}

const mapStateToProps = state => ({
  login_status: state.userReducer.login_status
})

const mapDispatchToProps = {
  getLoginStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(App);