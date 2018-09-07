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
import Temporary from './pages/temporary';

const Routes = (props) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/' exact component={Temporary} />
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;