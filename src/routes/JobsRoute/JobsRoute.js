import React, { Component } from 'react'
import JobReelContext from '../../context/JobReelContext';
import Job from '../../components/Job/Job'
import './JobsRoute.css';
import config from '../../config'
import TokenService from '../../services/token-service'
import GithubJob from '../../components/Job/GithubJob';
import SideNav from '../../components/SideNav/SideNav';
import MediaQuery from 'react-responsive';
import jobsRouteImage from '../../assests/jobsRouteImage.svg';
import TopNav from '../../components/TopNav/TopNav'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class JobsRoute extends Component {
  state = {
  search: null,
  savedJobUrls: {}
  }
  static contextType = JobReelContext

  componentDidMount() {
    const savedJobUrls = this.context.savedJobs.map(job => job.url);
    let savedJobUrlsObj = {};
    savedJobUrls.forEach(url => {
      savedJobUrlsObj[url] = url;
    });
    this.setState({ savedJobUrls: savedJobUrlsObj });
    const search = this.context.search
    setTimeout(() => {
      Promise.all([
        fetch(`${config.API_ENDPOINT}/jobs/authentic`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify({
            search
          }),
        }),
        fetch(`${config.API_ENDPOINT}/jobs/github`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify({
            search
          }),
        })
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
          this.context.setGithubJobs(data2)
          this.context.setAuthenticJobs(data1.listings.listing)
        });
    }, 500)
  }
   
  renderJobList() {
    const {gitHubJobs = [] } = this.context
    const {authenticJobs = [] } = this.context
    console.log(gitHubJobs)
    console.log(authenticJobs)
    const jobsListOne = gitHubJobs.map((job) => {
      return <GithubJob job={job} key={job.id} savedJobUrls={this.state.savedJobUrls}/>
    })
    const jobsListTwo = authenticJobs.map((job) => {
      return (
        <Job job={job} company={job.company} type={job.type} location={job.company.name} key={job.id} savedJobUrls={this.state.savedJobUrls}/>
      )
    })

    let joinedList = jobsListOne.concat(jobsListTwo);

    return (
      <div className='job-results'>
        {joinedList}
      </div>
    )
  }


  render() {
    return (
      <div className='job-search-results'>
        <div className='jobsRouteImage'>
          <img src={jobsRouteImage} alt='jobs-route-background'/>
        </div>
        <div className='title'>
          <h2>Jobs List</h2>
        </div>
          <MediaQuery minDeviceWidth={961}>
            <SideNav/>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={960}>
            <TopNav/>
          </MediaQuery>
        <div className='job-results-container'>
          <Link  to={`/jobs`} alt="goBack">
              <FontAwesomeIcon id='job-go-back' icon='times-circle' size='2x'/>
          </Link>
          {this.renderJobList()}
        </div>
        
        
      </div>
    )
  }

}