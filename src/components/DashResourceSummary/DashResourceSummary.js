import React from 'react';
import { Link } from 'react-router-dom';
import './DashResourceSummary.css';
import jobReelContext from '../../context/JobReelContext';
import jobReelApiService from '../../services/jobreel-api-service';

class DashResourceSummary extends React.Component {

  static contextType = jobReelContext

  componentDidMount() {
    if (this.context.savedJobs.length === 0) {
      jobReelApiService.getSavedResources()
        .then(res => {
          this.context.setResources(res);
        })
    }
  }

  renderResourceSummaries = () => {
    let resources = Array.from(this.context.resources);
    resources = resources.sort((a, b) => {
      return new Date(b.date_added) - new Date(a.date_added);
    });
    resources = resources.slice(0, 3).map(resource => {
      return (
        <li key={resource.resource_id}>{resource.type.toUpperCase()} - {resource.title}</li>
      )
    })
    return (
      <ul className='ul'>
        {resources}
      </ul>
    )
  }
  
  render() {
    return (
      <>
        <div className="DashResourceSummary">
          <h4>{this.props.section}</h4>
        </div>
        <div className='options'>
            {this.renderResourceSummaries()}
        </div>
        <div className='viewAll'>
          <Link to="/resources">View all</Link>
        </div>
        
      </>
    )
  }
}

export default DashResourceSummary;