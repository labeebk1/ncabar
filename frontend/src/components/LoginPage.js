import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';

class LoginPage extends Component {
    

  constructor(props) {
    super(props);
    this.state = { 
      register: false
    };
    this.onClickRegister = this.onClickRegister.bind(this);
  }

  onClickRegister() {
    this.setState({
      register: !this.state.register
    });
  }
  
  render() {
    return (
      <div className="App">
        {this.state.register ? <Register onClickCancel={this.onClickRegister}/> : <Login onClickRegister={this.onClickRegister}/>}
        <footer className="page-footer green lighten-1 center-align">
            <div className="container">
            © 2019 Copyright NCA & Bar Tutoring Group
            </div>
        </footer>
      </div>
      )}
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = {
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);