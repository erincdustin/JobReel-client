import React from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AddContactForm from '../../components/AddContactForm/AddContactForm';
import jobReelApiService from '../../services/jobreel-api-service';
import JobReelContext from '../../context/JobReelContext';
import './SavedContactsRoute.css';
import savedContBack from '../../assests/savedContBack.svg'
import TopNav from '../../components/TopNav/TopNav'
import ContactSummary from '../../components/ContactSummary/ContactSummary'

class SavedContactsRoute extends React.Component {
  
  static contextType = JobReelContext

  componentDidMount = () => {
    jobReelApiService.getSavedContacts()
      .then(res => {
        this.context.setContacts(res);
      }) 
  }

  render() {
    let display;
    (this.context.manualContactAdd === false) ? display = <ContactSummary /> : display = <AddContactForm /> 
    return (
      <div className="SavedContactsRoute">
        <div className='title'>
          <h2>Saved Contacts</h2>
        </div>
        <div className='savedContBack'>
          <img src={savedContBack} alt='saved-contact-background'/>
        </div>
          <SideNav/>
          <TopNav/>
        {display}
      </div>
    )
  }
}

export default SavedContactsRoute;