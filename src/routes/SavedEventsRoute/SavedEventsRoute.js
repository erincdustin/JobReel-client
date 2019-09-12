import React from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AddEventForm from '../../components/AddEventForm/AddEventForm';
import jobReelApiService from '../../services/jobreel-api-service';
import JobReelContext from '../../context/JobReelContext';
import savedEventsBack from '../../assests/savedEventsBack.svg'
import SavedEventsSummary from '../../components/SavedEventsSummary/SavedEventsSummary'
import TopNav from '../../components/TopNav/TopNav'
import './SavedEventsRoute.css';

class SavedEventsRoute extends React.Component {
  
  static contextType = JobReelContext

  componentDidMount = () => {
    jobReelApiService.getSavedEvents()
      .then(res => {
        this.context.setSavedEvents(res);
      })
  }

  render() {
    let display;
    (this.context.manualEventAdd === false) ? display = <SavedEventsSummary /> : display = <AddEventForm /> 
    return (
      <div className="SavedEventsRoute">
        <div className='title'>
          <h2>Saved Events</h2>
        </div>
        <div className='savedEventsBack'>
          <img src={savedEventsBack} alt='saved-events-background'/>
        </div>
          <SideNav/>
          <TopNav/>
        {display}
      </div>
    )
  }
}

export default SavedEventsRoute;