import React from 'react';
import SideNav from '../../components/SideNav/SideNav';
import ResourcesForm from '../../components/ResourcesForm/ResourcesForm';
import './ResourcesRoute.css';
import ResourcesList from '../../components/ResourcesList/ResourcesList';
import JobReelApiService from '../../services/jobreel-api-service';
import JobReelContext from '../../context/JobReelContext';
import resourcesBack from '../../assests/resourcesBack.svg'
import TopNav from '../../components/TopNav/TopNav';
class ResourcesRoute extends React.Component {

  static contextType = JobReelContext;

  componentDidMount = () => {
    JobReelApiService.getSavedResources()
      .then(res => {
        this.context.setResources(res)
      })
  }

  render() {
    let display;
    (this.context.manualResourceAdd === false) ? display = <ResourcesList /> : display = <ResourcesForm />
    return (
      <div className='resources-page'>
        <div className='title'>
          <h2>Saved Resources</h2>
        </div>
        <div className='resourcesBack'>
          <img src={resourcesBack} alt='resources-background'/>
        </div>
          <SideNav/>
          <TopNav/>
        {display}
      </div>
    )
  }
}

export default ResourcesRoute;