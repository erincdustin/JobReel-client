import React from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';
import JobReelContext from '../../context/JobReelContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends React.Component {

  static contextType = JobReelContext

  handleLogOutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='nav-links'>
        <nav role ='navigation'>
          <Link 
            onClick={this.handleLogOutClick}
            to='/login'
            className="header-link">
            Log Out
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='nav-links'>
        <nav role='navigation' className="login-logout">
          <Link to ='/login' className="header-link">Login</Link>
          {' '}
          <Link to='/' className="header-link">Sign Up</Link>
        </nav>
      </div>
    )
  }

  renderUsername() {
    if (this.context.user.username) {
      return (
        <>
          Signed in as  {this.context.user.username.toUpperCase()} <Link to='/profile'><FontAwesomeIcon className='user-cog' icon='user-cog'/> </Link>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  render() {
    return (
      <header className='header'>
        <div className='logo'>
          <Link to='/dashboard'>
            <FontAwesomeIcon className="fish" icon="fish"> </FontAwesomeIcon> 
            <div className="app-name"> JobReel</div>
          </Link>
        </div>
        <div className='username'>
            {this.renderUsername()}
        </div>
          {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}

      </header>
    )
  }
}

export default Header;