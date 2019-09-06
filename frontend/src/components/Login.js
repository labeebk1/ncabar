import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { userConstants } from '../constants/userConstants';
import { resetLoginPage, login } from '../actions/userActions';

class Login extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            submit_button_disabled: false,
            show_spinner: false
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
    }

    handleEmail(event){ this.setState({email: event.target.value}); }
    handlePassword(event){ this.setState({password: event.target.value}); }

    handleSubmit(event){
        event.preventDefault();
        this.props.resetLoginPage();
        M.toast({html: "Logging in", classes: 'green rounded'})
        this.setState({
          submit_button_disabled: true,
          show_spinner: true,
        });
        this.props.login(this.state.email, this.state.password);
    }

    handleFailure(){
      this.setState({
        submit_button_disabled: false,
        show_spinner: false,
      });
    }

    componentDidMount(){
        M.updateTextFields();
    }
    componentDidUpdate(prevProps) {
      if (this.props.login_request !== prevProps.login_request){
          if(this.props.login_request === userConstants.LOGIN_FAILURE){
              this.handleFailure();
          }
      }
    }
  

    render() {
        
    return (
      <div className="Login">
        <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <form onSubmit={this.handleSubmit}>
          <div className="card-content">
            <span className="card-title center-align green-text text-darken-3">
              <i className="material-icons prefix">check_circle</i> NCA & Bar Login
            </span>
            <div className="row">
              <div className={this.props.login_request === userConstants.LOGIN_FAILURE ? "input-field col s12 confirmPassword" : "input-field col s12"}>
                <i className="material-icons prefix">account_circle</i>
                <input disabled={this.state.submit_button_disabled} id="email" type="email" className="validate" autoComplete="on" value={this.state.email} onChange={this.handleEmail}  required/>
                <label htmlFor="email">Email</label>
              </div>
              <div className={this.props.login_request === userConstants.LOGIN_FAILURE ? "input-field col s12 confirmPassword" : "input-field col s12"}>
                <i className="material-icons prefix">dialpad</i>
                <input disabled={this.state.submit_button_disabled} id="password" type="password" className="validate" autoComplete="on" value={this.state.password} onChange={this.handlePassword} required/>
                <label htmlFor="password">Password</label>
                {this.props.login_request === userConstants.LOGIN_FAILURE ? 
                    <span className="helper-text red-text">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons tiny">error</i> Invalid email id or password.
                    </span> 
                    : null
                }
              </div>
            </div>
          </div>
          <div className="card-action right-align">
          {this.state.show_spinner ? 
                <span>
                <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-green-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
            : 
            <button className="btn-flat grey-text waves-effect" onClick={this.props.onClickRegister} type="button">
              Register
            </button>
            }
            
            <button disabled={this.state.submit_button_disabled} className="btn green waves-effect waves-light" type="submit">
              Login
            </button>
            <br/>
            <br/>
            {this.state.show_spinner ? null :
            <button className="btn blue-text forgotPassword" onClick={this.props.onClickForgotPassword} type="button">
              Forgot Password?
            </button>
            }
          </div>
        </form>
        </div>
        </div>
      </div>
    )}
}

const mapStateToProps = state => ({
  login_request: state.userReducer.login_request,
})

const mapDispatchToProps = {
  resetLoginPage,
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);