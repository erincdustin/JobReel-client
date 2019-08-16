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
import JobsList from '../JobsList/JobsList';

export default function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Switch>
          <Route
            exact path={'/JobsList'}
            component={JobsList}
          />
          <PublicOnlyRoute
            exact path={'/'}
            component={RegistrationRoute}
          />
          <PublicOnlyRoute
            path={'/login'}
            component={LoginRoute}
          />
          <PrivateRoute
            path={'/dashboard'}
            component={DashboardRoute}
          />
          <PrivateRoute
            path={'/saved-jobs'}
            component={SavedJobsRoute}
          />
          <PrivateRoute
            path={'/saved-events'}
            component={SavedEventsRoute}
          />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}