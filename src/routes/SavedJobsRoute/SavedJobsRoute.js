import React from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AddJobForm from '../../components/AddJobForm/AddJobForm';
import SavedJobSummary from '../../components/SavedJobSummary/SavedJobSummary'
import jobReelApiService from '../../services/jobreel-api-service';
import JobReelContext from '../../context/JobReelContext';
import TopNav from '../../components/TopNav/TopNav';
import savedJobBack from '../../assests/savedJobsBack.svg'
import './SavedJobsRoute.css';

class SavedJobsRoute extends React.Component {
  
  static contextType = JobReelContext

  componentDidMount = () => {
    jobReelApiService.getSavedJobs()
      .then(res => {
        this.context.setSavedJobs(res)
      })
  }

  render() {
    let display;
    (this.context.manualJobAdd === false) ? display = <SavedJobSummary /> : display = <AddJobForm /> 
    return (
      <div className="saved-jobs-page">
        <div className='title'>
          <h2>Saved Jobs</h2>
        </div>
        <div className='savedJobBackgroundImage'>
          <img src={savedJobBack} alt='saved-job-background'/>
        </div>
          <SideNav/>
          <TopNav/>
        {display}
      </div>
    )
  }
}

export default SavedJobsRoute;