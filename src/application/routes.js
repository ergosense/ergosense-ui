import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

/*
 | Pages import
 | ------------
 | Application pages, these are the main landing pages
 | for the application.
 */
import Dashboard from './../pages/dashboard/';
import Account from './../pages/account/';
import Accounts from './../pages/accounts/';
import Workspaces from './../pages/workspaces/';
import Assets from './../pages/assets/';

const Routes = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/account' exact component={Account} />
        <Route path='/accounts' exact component={Accounts} />
        <Route path='/workspaces' exact component={Workspaces} />
        <Route path='/assets' exact component={Assets} />
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;