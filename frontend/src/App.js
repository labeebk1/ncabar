/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoginStatus } from './actions/userActions';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.getLoginStatus();
  }

  render() {
    return (
    <div className="App">
        {
          JSON.stringify(this.props.login_status)
        }
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