import config from '../config'
import TokenService from './token-service'

const JobReelApiService = {
    getJobs(search) {
        return fetch(`${config.API_ENDPOINT}/jobs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                search,
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(data => {
                return data
            })
    },
    getSavedJobs() {
        return fetch(`${config.API_ENDPOINT}/savedjobs`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    submitJob(jobData) {
        return fetch(`${config.API_ENDPOINT}/savedjobs`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobData)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    submitResource(resourceData) {
        return fetch(`${config.API_ENDPOINT}/resources`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(resourceData)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deleteJob(jobId) {
        return fetch(`${config.API_ENDPOINT}/savedjobs/${jobId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                } else {
                    return res
                }
            })
            .catch(error => {
                console.error({ error })
            })
    },
    deleteEvent(eventId) {
        return fetch(`${config.API_ENDPOINT}/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                } else {
                    return res
                }
            })
            .catch(error => {
                console.error({ error })
            })
    },
    editJob(editedJob, jobId) {
        return fetch(`${config.API_ENDPOINT}/savedjobs/${jobId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedJob)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            } else {
                return res
            }
        })
        .catch(error => {
            console.error({ error })
        })
    },
    editEvent(editedEvent, eventId) {
        return fetch(`${config.API_ENDPOINT}/events/${eventId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedEvent)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            } else {
                return res
            }
        })
        .catch(error => {
            console.error({ error })
        })
    },
    getSavedEvents() {
        return fetch(`${config.API_ENDPOINT}/events`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    submitEvent(eventData) {
        return fetch(`${config.API_ENDPOINT}/events`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getSavedCompanies() {
        return fetch(`${config.API_ENDPOINT}/companies`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    submitCompany(companyData) {
        return fetch(`${config.API_ENDPOINT}/companies`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(companyData)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deleteCompany(companyId) {
        return fetch(`${config.API_ENDPOINT}/companies/${companyId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                } else {
                    return res
                }
            })
            .catch(error => {
                console.error({ error })
            })
    },
    editCompany(editedCompany, companyId) {
        return fetch(`${config.API_ENDPOINT}/companies/${companyId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedCompany)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            } else {
                return res
            }
        })
        .catch(error => {
            console.error({ error })
        })
    },
    getSavedContacts() {
        return fetch(`${config.API_ENDPOINT}/contacts`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    submitContact(contactData) {
        return fetch(`${config.API_ENDPOINT}/contacts`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(contactData)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getSavedResources() {
        return fetch(`${config.API_ENDPOINT}/resources`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    // submitContact(contactData) {
    //     return fetch(`${config.API_ENDPOINT}/contacts`, {
    //         method: 'POST',
    //         headers: {
    //             'authorization': `Bearer ${TokenService.getAuthToken()}`,
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(contactData)
    //     })
    //         .then(res =>
    //             (!res.ok)
    //                 ? res.json().then(e => Promise.reject(e))
    //                 : res.json()
    //         )
    // },
    deleteContact(contactId) {
        return fetch(`${config.API_ENDPOINT}/contacts/${contactId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                } else {
                    return res
                }
            })
            .catch(error => {
                console.error({ error })
            })
    },
    editResource(editedResource, resourceId) {
        return fetch(`${config.API_ENDPOINT}/resources/${resourceId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedResource)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            } else {
                return res
            }
        })
        .catch(error => {
            console.error({ error })
        })
    },
    deleteResource(resourceId) {
        return fetch(`${config.API_ENDPOINT}/resources/${resourceId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                } else {
                    return res
                }
            })
            .catch(error => {
                console.error({ error })
            })
    },
    editContact(editedContact, contactId) {
        return fetch(`${config.API_ENDPOINT}/contacts/${contactId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedContact)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            } else {
                return res
            }
        })
        .catch(error => {
            console.error({ error })
        })
    },
    getProfessionalEmails(search) {
        return fetch(`${config.API_ENDPOINT}/findcontacts`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ search })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getUserById(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(data => {
                return data
            })
    },
    editUserInfo(userData) {
        return fetch(`${config.API_ENDPOINT}/users/${userData.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(userData)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(data => {
                return data
            })
    },
    getEventBriteEvents(search) {
        return fetch(`${config.EVENTBRITE_API_ENDPOINT}/eventbrite/events`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                search,
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
}

export default JobReelApiService