import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'

class Login extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleEmail(event){ this.setState({email: event.target.value}); }
    handlePassword(event){ this.setState({password: event.target.value}); }

    handleSubmit(event){
        event.preventDefault();
    }

    componentDidMount(){
        M.updateTextFields();
    }

    render() {
        
    return (
      <div className="LoginPage">
        <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <form onSubmit={this.handleSubmit}>
          <div className="card-content">
            <span className="card-title center-align green-text text-darken-3">
              <i className="material-icons prefix">check_circle</i> NCA & Bar Login
            </span>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="email" type="email" className="validate" autoComplete="on" value={this.state.email} onChange={this.handleEmail}  required/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">dialpad</i>
                <input id="password" type="password" className="validate" autoComplete="on" value={this.state.password} onChange={this.handlePassword} required/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action right-align">
            <button className="btn-flat grey-text waves-effect" onClick={this.props.onClickRegister}>
              Register
            </button>
            <button className="btn green waves-effect waves-light" type="submit">
              Login
            </button>
            <br/>
            <br/>
            <button className="btn blue-text forgotPassword" onClick={this.props.onClickForgotPassword}>
              Forgot Password?
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
    )}
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);