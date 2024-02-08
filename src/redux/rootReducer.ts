import organisationsReducer from '@redux/reducers/organisationsReducer';
import userReducer from '@redux/reducers/userReducer';
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
  user: userReducer,
  organisations: organisationsReducer
  // kanban: kanbanReducer, // Example of reducer non-persisted
  // product: persistReducer(rootPersistConfig, productReducer) // Example of reducer persisted
});

export default rootReducer;
