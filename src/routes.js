import React from 'react';
import { history } from './helpers/store';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

/*
 | Pages import
 | ------------
 | Application pages, these are the main landing pages
 | for the application.
 */
import Dashboard from './pages/dashboard/';
// import Temporary from './pages/temporary';
import Account from './pages/account/';

const Routes = (props) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/account' exact component={Account} />
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;