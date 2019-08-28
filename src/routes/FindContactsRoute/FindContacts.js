import React, { Component } from 'react';
import JobReelContext from '../../context/JobReelContext'
import JobReelService from '../../services/jobreel-api-service'
import ProfessionalContact from '../../components/ProfessionalContact/ProfessionalContact'
import SideNav from '../../components/SideNav/SideNav'
import MediaQuery from 'react-responsive';
import findContactsRouteImage from '../../assests/findContactsRouteImage.svg'
import TopNav from '../../components/TopNav/TopNav'
import './FindContacts.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FindContactsRoute extends Component {

  static contextType = JobReelContext

  state = {
    search: null,
    savedContactEmails: null,
  }

  componentDidMount() {
    setTimeout(() => {
      JobReelService.getSavedContacts()
        .then(res => {
          const savedContactEmails = res.map(contact => contact.email)
          let savedContactEmailsObj = {}
          savedContactEmails.forEach(email => {
            savedContactEmailsObj[email] = email
          })
          this.setState({ savedContactEmails: savedContactEmailsObj })
            })
      const search = this.context.professionalsSearch
      JobReelService.getProfessionalEmails(search)
        .then(data => {
          this.context.setProfessionals(data.data.emails)
          this.context.setFindContactsMetaData(data.meta)
        })
    }, 500)
  }

  renderProfessionalContacts() {
    const { professionals = [], professionalsSearch = {} } = this.context
    const professionalList = professionals.map((professional, i) => {
      if (professional.first_name) {
        return <ProfessionalContact professional={professional} key={i} search={professionalsSearch} savedContactEmails={this.state.savedContactEmails}/>
      }
      return <></>         
    })
    return (
      <div className='results'>
        {professionalList}
      </div>
    )
  }
  render() {
    return (
      <div className='contacts-search-results'>
        <div className='findContactsRouteImage'>
          <img src={findContactsRouteImage} alt='find-contacts-route-background'/>
        </div>
        <div className='title'>
          <h2>Find Contacts</h2>
        </div>
        <MediaQuery minDeviceWidth={961}>
          <SideNav/>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={960}>
          <TopNav/>
        </MediaQuery>
        <div className='results-container'>
          <Link to={`/professionalsearch`} alt="goBack">
            <FontAwesomeIcon id='go-back' icon='times-circle' size='2x'/>
          </Link>
          {this.renderProfessionalContacts()}
        </div>
        
      </div>
    )
  }
}