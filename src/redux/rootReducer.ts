import organisationsReducer from '@redux/reducers/organisationsReducer';
import connectedUserReducer from '@redux/reducers/connectedUserReducer';
import usersReducer from '@redux/reducers/usersReducer';
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  connectedUser: connectedUserReducer,
  organisations: organisationsReducer,
  users: usersReducer
  // kanban: kanbanReducer, // Example of reducer non-persisted
  // product: persistReducer(rootPersistConfig, productReducer) // Example of reducer persisted
});

export default rootReducer;
