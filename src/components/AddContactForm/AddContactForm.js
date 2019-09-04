import React from 'react';
import { Input, Label } from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import JobReelContext from '../../context/JobReelContext';
import jobReelApiService from '../../services/jobreel-api-service';
import './AddContactForm.css';

class AddContactForm extends React.Component {

  static contextType = JobReelContext

  state = {
    error: null
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({ error: null });
    const contact_name = e.target.contact_name.value;
    const job_title = e.target.job_title.value;
    const company = e.target.company.value;
    const email = e.target.email.value;
    const linkedin = e.target.linkedin.value;
    const comments = e.target.comments.value;
    let connected = false;
    const userInput = { user_id: this.context.user.id, job_title, company, contact_name, email, linkedin, comments, connected };
    jobReelApiService.submitContact(userInput)
      .then(res => {
        e.target.contact_name.value = '';
        e.target.job_title.value = '';
        e.target.company.value = '';
        e.target.email.value = '';
        e.target.linkedin.value = '';
        e.target.comments.value = '';
        this.context.setContacts([...this.context.contacts, res]);
        this.context.setManualContactAdd(false)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;
    return (
      <div className="AddContactForm">
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Label htmlFor='contact-name-input'>
              Contact
            </Label>
            <br/>
            <Input
              id='contact-name-input'
              name='contact_name'
            />
          </div>
          <div>
            <Label htmlFor='job-title-input'>
              Job Title
            </Label>
            <br/>
            <Input
              id='job-title-input'
              name='job_title'
            />
          </div>
          <div>
            <Label htmlFor='company-input'>
              Company
            </Label>
            <br/>
            <Input
              id='company-input'
              name='company'
            />
          </div>
          <div>
            <Label htmlFor='email-input'>
              Email
            </Label>
            <br/>
            <Input
              id='email-input'
              name='email'
            />
            <p>Need to verify email? Click <a target="_blank" rel="noopener noreferrer" href="https://hunter.io/email-verifier">here</a></p>
          </div>
          <div>
            <Label htmlFor='linkedin-input'>
              LinkedIn
            </Label>
            <br/>
            <Input
              id='linkedin-input'
              name='linkedin'
            />
          </div>
          <div>
            <Label htmlFor='comments-input'>
              Comments
            </Label>
            <br/>
            <Input
              id='comments-input'
              name='comments'
            />
          </div>
          <Button onClick={() => this.context.setManualContactAdd(false)} type="button">Back</Button>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }
}

export default AddContactForm;