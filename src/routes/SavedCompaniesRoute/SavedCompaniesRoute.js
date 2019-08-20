import React from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AddCompanyForm from '../../components/AddCompanyForm/AddCompanyForm';
import jobReelApiService from '../../services/jobreel-api-service';
import JobReelContext from '../../context/JobReelContext';
import CompanySummary from '../../components/CompanySummary/CompanySummary';
import './SavedCompaniesRoute.css';

class SavedCompaniesRoute extends React.Component {
  
  static contextType = JobReelContext

  componentDidMount = () => {
    if (this.context.companies.length === 0)
    jobReelApiService.getSavedCompanies()
      .then(res => {
        this.context.setCompanies(res);
      })
  }

  render() {
    let display;
    (this.context.manualCompanyAdd === false) ? display = <CompanySummary /> : display = <AddCompanyForm /> 
    return (
      <div className="SavedCompaniesRoute">
        <div className='title'>
          <h2>Companies</h2>
        </div>
        <SideNav />
        {display}
      </div>
    )
  }
}

export default SavedCompaniesRoute;