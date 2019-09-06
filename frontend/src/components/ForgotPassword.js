import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { userConstants } from '../constants/userConstants';
import { resetForgotPassword, forgotPassword } from '../actions/userActions';

class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state = {
            submit_button_disabled: false,
            show_spinner: false,
            email: '',
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.props.resetForgotPassword();
    }

    handleEmail(event){ this.setState({email: event.target.value}); }

    handleSubmit(event){
      this.props.resetForgotPassword();
      M.toast({html: "Sending new password", classes: 'green rounded'})
      this.setState({
        submit_button_disabled: true,
        show_spinner: true,
      });
      event.preventDefault();
      this.props.forgotPassword(this.state.email);
      // Create call to action & reducer
  }

    handleFailure(){
      this.setState({
        submit_button_disabled: false,
        show_spinner: false,
      });
    }
    handleSuccess(){
      M.toast({html: "Updated password! Please check your email", classes: 'green rounded'});
      this.props.resetForgotPassword();
      this.props.onClickCancel();
    }
  
    componentDidMount(){
        M.updateTextFields();
    }
    componentDidUpdate(prevProps) {
      if (this.props.email_status !== prevProps.email_status){
          if(this.props.email_status === userConstants.EMAIL_DOES_NOT_EXIST || this.props.email_status === userConstants.EMAIL_SERVICE_UNAVAILABLE){
              this.handleFailure();
          }
          if(this.props.email_status === userConstants.EMAIL_EXISTS_SUCCESS){
              this.handleSuccess();
          }
      }
    }
  
    render() {
        
    return (
      <div className="ForgotPassword">
        <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <form onSubmit={this.handleSubmit}>
          <div className="card-content">
            <span className="card-title center-align green-text text-darken-3">
              Forgot Password
            </span>
            <p className="center-align">
              A new password will be emailed to your account's email address.
            </p>
            <br/>
            <div className="row">
              <div className={this.props.email_status === userConstants.EMAIL_DOES_NOT_EXIST ? "input-field col s12 confirmPassword" : "input-field col s12"}>
                <i className="material-icons prefix">account_circle</i>
                <input disabled={this.state.submit_button_disabled} id="email" type="email" className="validate" autoComplete="on" value={this.state.email} onChange={this.handleEmail} required/>
                <label htmlFor="email">Email</label>
                {this.props.email_status === userConstants.EMAIL_DOES_NOT_EXIST ? 
                    <span className="helper-text red-text">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons tiny">error</i> The email address does not exist.
                    </span> 
                    : null
                }
                {this.props.email_status === userConstants.EMAIL_SERVICE_UNAVAILABLE ? 
                    <span className="helper-text red-text">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons tiny">error</i> Email services are unavailable. Please contact labeebk1@gmail.com.
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
            <button className="btn-flat grey-text waves-effect" type="button" onClick={this.props.onClickCancel}>
                Cancel
            </button>
            }
            <button disabled={this.state.submit_button_disabled} className="btn green waves-effect waves-light" type="submit">
                Submit
            </button>
            </div>
        </form>
        </div>
        </div>
      </div>
    )}
}

const mapStateToProps = state => ({
  email_status: state.userReducer.email_status
})

const mapDispatchToProps = {
  resetForgotPassword,
  forgotPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);