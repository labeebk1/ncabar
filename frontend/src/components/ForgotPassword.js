import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'

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
    }

    handleEmail(event){ this.setState({email: event.target.value}); }

    handleSubmit(event){

      M.toast({html: "Sending new password", classes: 'green rounded'})
      this.setState({
        submit_button_disabled: true,
          show_spinner: true,
      });
      event.preventDefault();
      // Create call to action & reducer
  }

    componentDidMount(){
        M.updateTextFields();
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
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="email" type="email" className="validate" autoComplete="on" value={this.state.email} onChange={this.handleEmail} required/>
                <label htmlFor="email">Email</label>
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
    ...state
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);