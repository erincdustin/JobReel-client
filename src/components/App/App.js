import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import SavedJobsRoute from '../../routes/SavedJobsRoute/SavedJobsRoute';
import SavedEventsRoute from '../../routes/SavedEventsRoute/SavedEventsRoute';
import SavedCompaniesRoute from '../../routes/SavedCompaniesRoute/SavedCompaniesRoute';
import JobsRoute from '../../routes/JobsRoute/JobsRoute'
import JobSearchForm from '../JobSearchForm/JobSearchForm';
import SavedContactsRoute from '../../routes/SavedContactsRoute/SavedContactsRoute';
import FindProfessionalsForm from '../FindProfessionalsForm/FindProfessionalsForm'
import FindContactsRoute from '../../routes/FindContactsRoute/FindContacts';
import ResourcesRoute from '../../routes/ResourcesRoute/ResourcesRoute';
import ProfileRoute from '../../routes/ProfileRoute/ProfileRoute';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import { faChevronLeft, faFish, faTrashAlt, faTimesCircle, faCompressArrowsAlt, faExpandArrowsAlt, faLocationArrow, faSuitcase, faUserCog} from '@fortawesome/free-solid-svg-icons';
import EventBriteSearches from '../../routes/EventRoute/EventBriteSearches';
import EventBriteList from '../EventBriteList/EventBriteList';
import ContactRoute from '../../routes/ContactRoute/ContactRoute';


library.add(fab, faChevronLeft, faFish, faTrashAlt, faTimesCircle, faCompressArrowsAlt, faExpandArrowsAlt, faLocationArrow, faSuitcase, faUserCog, faGithub, faLinkedin);

export default function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Switch>
          <Route
            path={'/communicate'}
            component={ContactRoute}
          />  
        <PrivateRoute
            path={'/eventbriteevents'}
            component={EventBriteList}
          />
        <PrivateRoute
            path={'/eventbritesearch'}
            component={EventBriteSearches}
          />
          <PrivateRoute
            path={'/professionalsearch'}
            component={FindProfessionalsForm}
          />
          <PrivateRoute
            path={'/findcontacts'}
            component={FindContactsRoute}
          />
          <PrivateRoute
            exact path={'/jobsearch'}
            component={JobSearchForm}
          />
          <PublicOnlyRoute
            exact path={['/', '/register']}
            component={RegistrationRoute}
          />
          <PublicOnlyRoute
            path={'/login'}
            component={LoginRoute}
          />
          <PrivateRoute
            exact path={'/dashboard'}
            component={DashboardRoute}
          />
          <PrivateRoute
            path={'/jobslist'}
            component={JobsRoute}
          />
          <PrivateRoute
            path={'/saved-jobs'}
            component={SavedJobsRoute}
          />
          <PrivateRoute
            path={'/saved-events'}
            component={SavedEventsRoute}
          />
          <PrivateRoute
            path={'/jobs'}
            component={JobSearchForm}
          />
          <PrivateRoute
            path={'/companies'}
            component={SavedCompaniesRoute}
          />
          <PrivateRoute
            path={'/resources'}
            component={ResourcesRoute}
          />
          <PrivateRoute
            path={'/contacts'}
            component={SavedContactsRoute}
          />
          <PrivateRoute
            path={'/profile'}
            component={ProfileRoute}
          />
          <Route
            component={NotFoundRoute}
          />
        </Switch>
      </main>
      {/* <Footer /> */}
    </div>
  );
}