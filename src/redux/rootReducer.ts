import exampleReducer from '@src/redux/reducers/ExampleReducer.ts';
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
// Add import slices here

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  example: exampleReducer
  // kanban: kanbanReducer, // Example of reducer non-persisted
  // product: persistReducer(rootPersistConfig, productReducer) // Example of reducer persisted
});

export default rootReducer;
