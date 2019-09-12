import React from 'react';
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import jobSearchFormImage from '../../assests/jobSearchFormImage.svg'
import './JobSearchForm.css';
import JobReelContext from '../../context/JobReelContext';
import jobReelApiService from '../../services/jobreel-api-service';

class JobSearchForm extends React.Component {
  static contextType = JobReelContext

  componentDidMount() {
    if (this.context.savedJobs.length === 0) {
      jobReelApiService.getSavedJobs()
        .then(res => {
          this.context.setSavedJobs(res);
        })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const industry = e.target.industry.value;
    const jobTitle = e.target['job-title'].value;
    const location = e.target.location.value;
    this.context.setSearch({ jobTitle, location })
    this.props.history.push(`/jobslist`)
  }

  takeToNext = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/jobsearch/results';
    history.push(destination);
  }

  render() {
    return (
      <div className='job-search'>
        <div className='jobSearchFormImage'>
          <img src={jobSearchFormImage} alt='job-search-background'/>
        </div>
        <div className='title'>
          <h2>Search for Job</h2>
        </div>
        <form className='JobSearchForm' onSubmit={this.handleSubmit}>
          <div>
            <Label htmlFor='job-title-input'>
              Job Title
            </Label>
            <br />
            <Input
              id='job-title-input'
              name='job-title'
            />
          </div>
          <div>
            <Label htmlFor='location-input'>
              Location
            </Label>
            <br />
            <Input
              ref={this.firstInput}
              id='location-input'
              name='location'
            />
          </div>
          <br />
          <Button type="submit">Submit</Button>
          <Button type="submit" onClick={() => this.props.history.push('/dashboard')}>Back</Button>
        </form>
      </div>
    )
  }
}

export default JobSearchForm;