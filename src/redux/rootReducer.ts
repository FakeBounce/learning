import organizationsReducer from '@redux/reducers/organizationsReducer';
import connectedUserReducer from '@redux/reducers/connectedUserReducer';
import usersReducer from '@redux/reducers/usersReducer';
import rolesReducer from '@redux/reducers/rolesReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import applicantsReducer from '@redux/reducers/applicantsReducer';
import groupsReducer from '@redux/reducers/groupsReducer';
import modulesReducer from '@redux/reducers/modulesReducer';

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'lms-',
  whitelist: ['connectedUser']
};

export const connectedUserPersistConfig = {
  // @TODO Doesnt work if we set key:connectedUser which is what it's supposed to be
  key: 'root',
  storage,
  whitelist: ['user', 'login']
};

const rootReducer = combineReducers({
  connectedUser: persistReducer(connectedUserPersistConfig, connectedUserReducer),
  organizations: organizationsReducer,
  users: usersReducer,
  roles: rolesReducer,
  applicants: applicantsReducer,
  groups: groupsReducer,
  modules: modulesReducer
});

export default rootReducer;
