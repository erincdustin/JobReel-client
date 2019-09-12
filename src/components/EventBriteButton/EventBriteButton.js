import React, { Component } from 'react';
import config from '../../config'
import TokenService from '../../services/token-service'


export default class EventBriteButton extends Component {

  state = {
    url: null
  }

  componentDidMount () {
    fetch(`${config.EVENTBRITE_API_ENDPOINT}/eventbrite`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(data => {
        this.setState({url: data.url})
      })
  }

  renderURL() {
    const url = this.state.url
    return (
      <div className='content'>
        <a href={url}>Search Events</a>    
      </div>
      
    )
  }   

  render() {
    return (
      <div className='eventBriteRoute'>
        {this.state.url && this.renderURL()}
      </div>
    );
  }
}