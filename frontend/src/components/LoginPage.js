import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

class LoginPage extends Component {
    

  constructor(props) {
    super(props);
    this.state = { 
      register: false,
      forgot_password: false
    };
    this.onClickRegister = this.onClickRegister.bind(this);
    this.onClickForgotPassword = this.onClickForgotPassword.bind(this);
  }

  onClickRegister() {
    this.setState({
      register: !this.state.register
    });
  }
  onClickForgotPassword() {
    this.setState({
      forgot_password: !this.state.forgot_password
    });
  }
  
  render() {
    return (
      <div className="LoginPage">
        {this.state.register ? <Register onClickCancel={this.onClickRegister}/> : 
          this.state.forgot_password ? 
          <ForgotPassword onClickCancel={this.onClickForgotPassword} /> : 
            <Login onClickRegister={this.onClickRegister} onClickForgotPassword={this.onClickForgotPassword}/>}
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