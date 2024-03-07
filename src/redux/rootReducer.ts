import organizationsReducer from '@redux/reducers/organizationsReducer';
import connectedUserReducer from '@redux/reducers/connectedUserReducer';
import usersReducer from '@redux/reducers/usersReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['connectedUser']
};

export const connectedUserPersistConfig = {
  key: 'connectedUser',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  connectedUser: persistReducer(connectedUserPersistConfig, connectedUserReducer),
  organizations: organizationsReducer,
  users: usersReducer
});

export default rootReducer;
