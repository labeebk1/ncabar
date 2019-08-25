import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { registerUser, resetRegisterUser } from '../actions/userActions';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            register_button_disabled: false,
            show_spinner: false,
            password_match_error: false
        }
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    handleFirstName(event){ this.setState({first_name: event.target.value}); }
    handleLastName(event){ this.setState({last_name: event.target.value}); }
    handleEmail(event){ this.setState({email: event.target.value}); }
    handlePassword(event){ this.setState({password: event.target.value}); }
    handleConfirmPassword(event){ this.setState({confirmPassword: event.target.value}); }

    handleSubmit(event){
        this.setState({
            password_match_error: false
        });
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                password_match_error: true
            });
            event.preventDefault();
        } else {
            M.toast({html: "Registering Email ID", classes: 'green rounded'})
            this.setState({
                register_button_disabled: true,
                show_spinner: true,
                password_match_error: false
            });
            event.preventDefault();
            // Create call to action & reducer
            this.props.registerUser(
                this.state.first_name,
                this.state.last_name,
                this.state.email,
                this.state.password
            );
        }
    }

    handleSuccess(){
        M.toast({html: "Account created! You can now login.", classes: 'green rounded'});
        this.props.resetRegisterUser();
        this.props.onClickCancel();
    }

    componentDidMount(){
        M.updateTextFields();
    }

    render() {
    return (
        <div className="Register">
        <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <form onSubmit={this.handleSubmit}>
          <div className="card-content">
            <span className="card-title center-align green-text text-darken-3">
              <i className="material-icons prefix">check_circle</i> NCA & Bar Registration
            </span>
            
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_box</i>
                <input id="first_name" type="text" className="validate" autoComplete="off" value={this.state.first_name} onChange={this.handleFirstName} required/>
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">account_box</i>
                <input id="last_name" type="text" className="validate" autoComplete="off" value={this.state.last_name} onChange={this.handleLastName} required/>
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="email" type="email" className="validate" autoComplete="off" value={this.state.email} onChange={this.handleEmail} required/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">dialpad</i>
                <input id="password" type="password" className="validate" autoComplete="off" value={this.state.password} onChange={this.handlePassword} required/>
                <label htmlFor="password">Password</label>
              </div>
              <div className={this.state.password_match_error ? "input-field col s12 confirmPassword" : "input-field col s12"}>
                <i className="material-icons prefix">dialpad</i>
                <input id="confirm-password" type="password" className="validate" autoComplete="off" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} required/>
                <label htmlFor="confirm-password">Confirm Password</label>
                {this.state.password_match_error ? 
                    <span className="helper-text red-text">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <i className="material-icons tiny">error</i> The passwords do not match.
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
            <button disabled={this.state.register_button_disabled} className="btn green waves-effect waves-light" type="submit">
                Register
            </button>
            {this.props.register_status === 'REGISTER_SUCCESS' ? this.handleSuccess() : null}
            </div>
        </form>
        </div>
        </div>
        </div>
    )}
}

const mapStateToProps = state => ({
    register_status: state.userReducer.register_status
})

const mapDispatchToProps = {
    registerUser,
    resetRegisterUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);