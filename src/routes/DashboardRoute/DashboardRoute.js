import React from 'react';
import './DashboardRoute.css';
import JobReelContext from '../../context/JobReelContext';
import SideNav from '../../components/SideNav/SideNav';
import TopNav from '../../components/TopNav/TopNav';
import SummaryContainer from '../../components/SummaryContainer/SummaryContainer';
import summary from './summary.svg';


class DashboardRoute extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  state = { error: null };

  static contextType = JobReelContext;

  render() {
    return(
      <div className='dashboard-page'>
        <div className='title'>
          <h2>Dashboard</h2>
        </div>
        <div className='dashboard-image'>
          <img src={summary} alt='summary-background'/>
        </div>
          <SideNav/>
          <TopNav/>
        <SummaryContainer />
      </div>
    )
  }
}

export default DashboardRoute