import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import JobReelContext from '../../context/JobReelContext';
import jobReelApiService from '../../services/jobreel-api-service';
import Moment from 'react-moment';
import Iframe from 'react-iframe';
import './EventBriteItem.css';

export default class EventBriteList extends Component {
    static contextType = JobReelContext

    state = {
        host: '',
        address: '',
        city: '',
        region: '',
        URL: false,
        expanded: false,
        saved: false,
    }

    static getDerivedStateFromProps(props) {
        const {savedEventUrls, url} = props;
        if (url in savedEventUrls) {
            return {saved: true};
        }
        return null;
    }

    componentDidMount() {
        const venue_id = this.props.venue_id
        const venue = { id: venue_id }
        fetch(`${config.EVENTBRITE_API_ENDPOINT}/eventbrite/venue`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                venue,
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(data => {
                this.setState({ city: data.address.city })
                this.setState({ region: data.address.region })
                this.setState({ host: data.name })
                this.setState({ address: data.address.localized_address_display })
            })
    }

    handleClick = () => {
        const eventData = {
            event_name: this.props.name,
            host: this.state.host,
            city: this.state.city,
            state: this.state.region,
            address: this.state.address,
            date: this.props.date,
            url: this.props.url,
            description: this.props.description
        }
        jobReelApiService.submitEvent(eventData)
            .then(res => {
                this.setState({saved: true});
                this.context.setSavedEvents([...this.context.savedEvents, res]);
            })
    }

    handleExpand = () => {
        this.setState({ expanded: true })
    }

    handleCollapse = () => {
        this.setState({ expanded: false })
    }

    handleURL = () => {
        this.setState({ URL: true })
    }

    handleURLcollapse = () => {
        this.setState({ URL: false })
    }

    renderEvent() {
        const name = this.props.name
        const host = this.state.host
        const address = this.state.address
        const date = this.props.date
        return (
            <div className='event-card'>
                <div className='event-name'>
                    <h4>{name}</h4>
                </div>
                <div className='event-host'>
                    <p>Host: {host}</p>
                </div>
                <div className='event-address'>
                    <p>Address: {address}</p>
                </div>
                <div className='event-date'>
                    <p>Date:<Moment format="MM/DD/YYYY">{date}</Moment></p>
                </div>
                <div className='event-controls'>
                    <br />
                    {!this.state.URL && <button onClick={this.handleURL}>Event Page</button>}
                    <br/>
                    {this.state.URL && this.renderEventURL()}
                    {this.state.URL && this.renderURLcollapse()}
                    <button onClick={this.handleExpand}>
                        More Details
                    </button>
                    {this.renderSaveButton()}
                </div>
            </div>
        )
    }

    renderEventExpanded() {
        const name = this.props.name
        const description = this.props.description
        const host = this.state.host
        const venue = this.state
        const address = venue.address
        const date = this.props.date
        return (
            <div className='event-card'>
                <div className='event-name'>
                    <h4>{name}</h4>
                </div>
                <div className='event-host'>
                    <p>Host: {host}</p>
                </div>
                <div className='event-address'>
                    <p>Address: {address}</p>
                </div>
                <div className='event-date'>
                    <p>Date:<Moment format="MM/DD/YYYY">{date}</Moment></p>
                </div>
                <div className='event-description'>
                    <p>{description}</p>
                </div>
                <div className='event-controls'>
                    <br />
                    {!this.state.URL && <button onClick={this.handleURL}>Event Page</button>}
                    <br/>
                    {this.state.URL && this.renderEventURL()}
                    <br/>
                    {this.state.URL && this.renderURLcollapse()}
                    <br/>
                    <button onClick={this.handleCollapse}>
                        Collapse Description
                    </button>
                    <br/>
                    {this.renderSaveButton()}
                </div>
            </div>
        )
    }

    renderSaveButton() {
        if (this.state.saved) {
            return (
                    <p>Saved &#10004;</p>
            )
        }
        return (
                <button id='save-button-event' onClick={this.handleClick}>Save Event</button>
        )   
    }

    renderEventURL() {
        const url = this.props.url
        return (
            <>
                <Iframe url={url}
                    width="300px"
                    height="300px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative" />
            </>
        )
    }

    renderURLcollapse = () => {
        return (
            <button onClick={this.handleURLcollapse}>
                Collapse URL
            </button>
        )
    }

    renderFunction = () => {
        if (this.state.expanded) {
            return this.renderEventExpanded()
        }
        else {
            return this.renderEvent()
        }
    }



    render() {
        return (
            <>
                {this.renderFunction()}
            </>
        );
    }
}