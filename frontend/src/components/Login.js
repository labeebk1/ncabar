import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'

class Login extends Component {

    componentDidMount(){
        M.updateTextFields();
    }

    render() {
        
    return (
      <div className="LoginPage">
        <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <div className="card-content">
            <span className="card-title center-align green-text text-darken-3">
              <i className="material-icons prefix">check_circle</i> NCA & Bar Login
            </span>
            <div className="row">
              <form>
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="email" type="email" className="validate" autoComplete="on"/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">dialpad</i>
                <input id="password" type="password" className="validate" autoComplete="on"/>
                <label htmlFor="password">Password</label>
              </div>
              </form>
            </div>
          </div>
          <div className="card-action right-align">
            <button className="btn-flat grey-text waves-effect" type="submit" onClick={this.props.onClickRegister}>
              Register
            </button>
            <button className="btn green waves-effect waves-light" type="submit">
              Login
            </button>
          </div>
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