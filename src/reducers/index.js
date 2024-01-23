import { combineReducers } from 'redux';

import pullrequests from './pullrequests';
import auth from './auth';

export const reducers = combineReducers({ pullrequests, auth });
