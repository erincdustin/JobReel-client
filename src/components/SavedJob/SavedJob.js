import React from 'react';
import Button from '../../components/Button/Button';
import JobReelContext from '../../context/JobReelContext';
import jobReelApiService from '../../services/jobreel-api-service';
import './SavedJob.css'
import { format } from 'date-fns'

class SavedJob extends React.Component {

  static contextType = JobReelContext;

  state = {
    editing: false,
    company: this.props.company || '',
    title: this.props.title || '',
    city: this.props.city || '',
    state: this.props.state || '',
    url: this.props.url || '',
    status: this.props.status || '',
    description: this.props.desc || ''
  };

  renderStateOptions = () => {
    const states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
    ];
    return states.map(state => {
      return <option key={state[1]} value={state[1]}>{state[0]}</option>
    })
  }

  handleToggle = () => {
    this.setState({ editing: !this.state.editing })
  }

  handleChangeCompany = e => {
    this.setState({ company: e.target.value })
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  };

  handleChangeCity = e => {
    this.setState({ city: e.target.value })
  };

  handleChangeState = e => {
    this.setState({ state: e.target.value })
  };

  handleChangeUrl = e => {
    this.setState({ url: e.target.value })
  };

  handleChangeStatus = e => {
    this.setState({ status: e.target.value })
  };

  handleChangeDesc = e => {
    this.setState({ description: e.target.value })
  };

  handleClickDelete(jobId){
    jobReelApiService.deleteJob(jobId)
    this.context.deleteJob(jobId)
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { title, company, city, state, url, status, description } = this.state
    const editedJob = { 
      job_title: title, 
      company, 
      city, 
      state, 
      url, 
      status, 
      description,
      job_id: this.props.id,
      date_added: this.props.date,
      user_id: this.props.user
     }
    await jobReelApiService.editJob(editedJob, this.props.id)
    await this.context.updateJob(editedJob)
    await this.handleToggle()
  }

  render(){
    const { title, company, city, state, url, status, description } = this.state
    let jobStatus;
    (status === 'Interested')
      ? jobStatus = <div className="job-status yellow">{status}</div>
      : jobStatus = <div className="job-status green">{status}</div> 
    let job = 
      <div className="job-box">
        {jobStatus}
        <h3>{company}: {title}</h3>
        <p>Posted {format(this.props.date, 'Do MMM YYYY')}</p>
        <p>{city}, {state}</p>
        <p><a href={url}>{url}</a></p>
        <p>{description}</p>
        <Button onClick={() => this.handleClickDelete(this.props.id)} type="button">Delete</Button>
        <Button onClick={this.handleToggle} type="button">Edit</Button>
      </div>
    let editJob = 
      <form
      className='edit-job-form'
      onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder={title}
            required
            value={title}
            onChange={this.handleChangeTitle}
          />
        </div>
        <div>
          <label htmlFor='company'>Company</label>
          <input
            type='text'
            name='company'
            id='company'
            placeholder={company}
            required
            value={company}
            onChange={this.handleChangeCompany}
          />
        </div>
        <div>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            id='city'
            placeholder={city}
            required
            value={city}
            onChange={this.handleChangeCity}
          />
        </div>
        <div>
          <label htmlFor='state'>State</label>
          <select onChange={this.handleChangeState} name="state" id="state-input" value={state}>
              {this.renderStateOptions()}
            </select>
        </div>
        <div>
          <label htmlFor='url'>URL</label>
          <input
            type='text'
            name='url'
            id='url'
            placeholder={url}
            required
            value={url}
            onChange={this.handleChangeUrl}
          />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea 
            name='description'
            id='description'
            placeholder={description}
            rows='3'
            required
            value={description}
            onChange={this.handleChangeDesc}
          />
        </div>
        <div>
          <label htmlFor='status'>Status</label>
          <select
              id='status-input'
              name='status'
              onChange={this.handleChangeStatus}
              value={status}
            >
              <option value="Interested">Interested</option>
              <option value="Applied">Applied</option>
            </select>
        </div>
        <Button type="submit">Save Changes</Button>
        <Button type="button" onClick={this.handleToggle}>Back</Button>
      </form>

    let display;
    (this.state.editing === false) ? display = job : display = editJob
    
    return(
      <div className="saved-job">
        {display}
      </div>
    )
  }
}

export default SavedJob