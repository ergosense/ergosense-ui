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
import Organisations from './../pages/organisations/';
import Workspaces from './../pages/workspaces/';
import WorkspaceEditor from './../pages/workspaces/editor/';
import Assets from './../pages/assets/';

const Routes = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/account' exact component={Account} />
        <Route path='/organisations' exact component={Organisations} />
        <Route path='/workspaces' exact component={Workspaces} />
        <Route path='/workspaces/:workspace' exact component={WorkspaceEditor} />
        <Route path='/assets' exact component={Assets} />
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;