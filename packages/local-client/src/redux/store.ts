import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistMiddleware } from './middlewares/persistMiddleware';
import { reducers } from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk));