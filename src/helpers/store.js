import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import reducers from './../reducers';
import logger from 'redux-logger'

const history = createBrowserHistory();
export { history }

// Middleware stack
const middleware = [];

// Router
middleware.push(routerMiddleware(history));

// Thunk dispatcher
middleware.push(thunk);

// Redux logger
middleware.push(logger);

export default createStore(
  connectRouter(history)(reducers),
  applyMiddleware(...middleware)
);