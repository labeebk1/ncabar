import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { logout } from '../actions/userActions';

class HomePage extends Component {

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  componentDidMount(){
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, 
      { inDuration: 300, 
        outDuration: 225,
        hover: true,
        closeOnClick: true,
        coverTrigger: false,
        belowOrigin: true,
      }
      );
  }

  handleLogout(){
    event.preventDefault();
    M.toast({html: "Logging out", classes: 'green rounded'});
    this.props.logout();
  }


  render() {
    return(
      <div className="HomePage">

        <nav>
          <div className="nav-wrapper blue">
          <ul className="left hide-on-med-and-down">
              <ul id="dropdown2" className="dropdown-content">
                <li><a href="#!">New Password</a></li>
                <li><a href="#!" onClick={this.handleLogout}>Logout</a></li>
              </ul>
              <li><a className="dropdown-trigger" href="#!" data-target="dropdown2">Courses<i className="material-icons left">view_module</i></a></li>
            </ul>
          <a href="#!" className="brand-logo center navTitle"><i class="material-icons">assignment_turned_in</i>Home</a>
            <ul className="right hide-on-med-and-down">
              <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">Account Settings</a></li>
                <li><a href="#!" onClick={this.handleLogout}>Logout</a></li>
              </ul>
              <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">{this.props.first_name}<i className="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </nav>




      </div>
    )};
  }

  const mapStateToProps = state => ({
    first_name: state.userReducer.first_name,
  })
  
  const mapDispatchToProps = {
    logout
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage);