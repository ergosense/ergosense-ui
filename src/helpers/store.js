import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import reducers from './../reducers';

const history = createBrowserHistory();
export { history }

//import thunk from 'redux-thunk';

export default createStore(
  connectRouter(history)(reducers),
  applyMiddleware(
    routerMiddleware(history)
  )
);