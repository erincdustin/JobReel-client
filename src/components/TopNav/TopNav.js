import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';
import EventBriteButton from '../EventBriteButton/EventBriteButton';

class TopNav extends React.Component {
  render() {
    return (
      <div className="TopNav">
        <div className='topLink'>
          <Link to='/jobsearch'>Search Jobs</Link>
        </div>
        <div className='topLink'>
          <Link to='/saved-jobs'>My Jobs</Link>
        </div>
        <div className='topLink'>
          <EventBriteButton/>
        </div>
        <div className='topLink'>
          <Link to='/saved-events'>My Events</Link>
        </div>
        <div className='topLink'>
          <Link to='/professionalsearch'>Search Contacts</Link>
        </div>
        <div className='topLink'>
          <Link to='/contacts'>My Contacts</Link>
        </div>
        <div className='topLink'>
          <Link to='/companies'>My Companies</Link>
        </div>
        <div className="topLink">
          <Link to='/resources'>My Resources</Link>
        </div>
      </div>
    )
  }
}

export default TopNav;