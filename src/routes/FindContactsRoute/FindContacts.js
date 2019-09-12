import React, { Component } from 'react';
import JobReelContext from '../../context/JobReelContext'
import JobReelService from '../../services/jobreel-api-service'
import ProfessionalContact from '../../components/ProfessionalContact/ProfessionalContact'
import SideNav from '../../components/SideNav/SideNav'
import findContactsRouteImage from '../../assests/findContactsRouteImage.svg'
import TopNav from '../../components/TopNav/TopNav'
import './FindContacts.css';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FindContactsRoute extends Component {

  static contextType = JobReelContext

  state = {
    search: null,
    savedContactEmails: [],
    noResults: false,
  }

  componentDidMount() {
    // if (this.context.professionalsSearch) {
    //   this.props.history.push(`/professionalsearch`)
    // }
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
          if (data.data.emails.length === 0) {
            this.setState({noResults : true })
          } else {
          this.context.setProfessionals(data.data.emails)
          this.context.setFindContactsMetaData(data.meta)
          }
        })
    }, 500)
  }

  renderProfessionalContacts() {
    const { professionals = [], professionalsSearch = {} } = this.context
    const professionalList = professionals.map((professional, i) => {
      if (professional.first_name) {
        return <ProfessionalContact professional={professional} key={i} search={professionalsSearch} savedContactEmails={this.state.savedContactEmails}/>
      } else {
        return null
      }           
    })
    if (this.state.noResults) {
      return (
        <>
        {this.renderNoResultsMessage()}
        </>
        )
    } else {
    return (
      <div className='results'>
        {professionalList}
      </div>
    )
    }
  }

  renderNoResultsMessage() {
    return (
      <h3 className="error-message">
        Sorry, no results were found from that search. 
      </h3>
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
          <SideNav/>
          <TopNav/>
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