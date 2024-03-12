import organizationsReducer from '@redux/reducers/organizationsReducer';
import connectedUserReducer from '@redux/reducers/connectedUserReducer';
import usersReducer from '@redux/reducers/usersReducer';
import rolesReducer from '@redux/reducers/rolesReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import applicantsReducer from '@redux/reducers/applicantsReducer';
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
  blacklist: ['permissions']
};

const rootReducer = combineReducers({
  connectedUser: persistReducer(connectedUserPersistConfig, connectedUserReducer),
  organizations: organizationsReducer,
  users: usersReducer,
  roles: rolesReducer,
  applicants: applicantsReducer
});

export default rootReducer;
