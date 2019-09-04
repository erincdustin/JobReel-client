import React from 'react';
import { Link } from 'react-router-dom';
import './DashContactSummary.css';
import jobReelContext from '../../context/JobReelContext';
import jobReelApiService from '../../services/jobreel-api-service';

class DashContactSummary extends React.Component {

  static contextType = jobReelContext

  componentDidMount() {
    if (this.context.contacts.length === 0) {
      jobReelApiService.getSavedContacts()
        .then(res => {
          this.context.setContacts(res);
        })
    }
  }

  renderContactSummaries = () => {
    let contacts = Array.from(this.context.contacts);
    contacts = contacts.sort((a, b) => {
      return new Date(b.date_added) - new Date(a.date_added);
    });
    contacts = contacts.slice(0, 3).map(contact => {
      let email = ''
      if(contact.email){
        let mailto = `mailto:${contact.email}`
        email = <a href={mailto}>{contact.email}</a>
      }
      return (
        <li key={contact.contact_id}>{contact.contact_name} - {contact.company} - {email} </li>
      )
    })
    return (
      <ul className='ul'>
        {contacts}
      </ul>
    )
  }
  
  render() {
    return (
      <>
        <div className="DashContactSummary">
          <h4>{this.props.section}</h4>
        </div>
        <div className='options'>
            {this.renderContactSummaries()}
        </div>
        <div className='viewAll'>
          <Link to="/contacts">View all</Link>
        </div>
      </>
    )
  }
}

export default DashContactSummary;