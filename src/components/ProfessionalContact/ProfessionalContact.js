import React, { Component } from 'react'
import './ProfessionalContact.css';
import Button from '../../components/Button/Button';
import JobReelContext from '../../context/JobReelContext';
import jobReelApiService from '../../services/jobreel-api-service';
export default class ProfessionalContact extends Component {

  
static contextType = JobReelContext

state = {
    error: null,
    saved: false
}

static getDerivedStateFromProps(props) {
    const {professional = {}, savedContactEmails = {} } = props
    if (professional.value in savedContactEmails) {
        return {saved: true};
    }
    return null;
}

handleClick = () => {
    this.setState({ saved: true })
    this.setState({ error: null });
    const contact_name = `${this.props.professional.first_name} ${this.props.professional.last_name}`
    const job_title = this.props.professional.position || 'unknown position'
    const company = this.props.search.company || this.props.search.domain
    const email = this.props.professional.value
    const linkedin = this.props.professional.linkedin
    const connected = false
    const userInput = { user_id: this.context.user.id, job_title, company, contact_name, email, linkedin, connected }
    jobReelApiService.submitContact(userInput)
        .then(res => {
        this.context.setContacts([...this.context.contacts, res]);
        })
        .catch(res => {
        this.setState({ error: res.error })
        })
}

renderSaveButton() {
    if (this.state.saved) {
        return (
            <div className='contact-save-button'>
                <p>Saved &#10004;</p>
            </div>
        
        )
    } else {
        return (
            <div className='contact-save-button'>
                <Button id='contact-save-button' onClick={this.handleClick}>Save Contact</Button>
            </div>
        
        )  
    } 
}
renderProfessionalContact() {
  const {professional = {}} = this.props
  return (
  <div className='contact-card'>
    <div className='contact-name'>
      <h3>Name: {professional.first_name} {professional.last_name}</h3>
    </div>
    <div className='contact-department'>  
        {professional.department ? <p>Department: {(professional.department).toUpperCase()}</p> : ''}
      </div>
      <div className='contact-position'>
        {professional.position ? <p>Position: {professional.position}</p> : ''}
      </div>
      <div className='contact-type'>
        {professional.type ? <p>Type: {professional.type}</p> : ''}
      </div>
      <div className='contact-email'>
        {professional.value ? <p>Email: {professional.value}</p> : ''}
      </div>
      <div className='contact-phone'>
        {professional.phone_number ? <a href={professional.phone_number} alt='professionals-phone'>Call</a> : ''}
      </div>
      <div>
        {professional.linkedin ?<a href={professional.linkedin} alt='contact-linkedIn-link'>LinkedIn</a> : ''}
      </div>
      <p className="error-message">{this.state.error}</p>
        {this.renderSaveButton()}
    </div>
    )
  }

  render() {
    return (
      <>
        {this.renderProfessionalContact()}
      </>
    )
  }
}