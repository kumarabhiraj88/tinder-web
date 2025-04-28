import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createTransform  } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


// Step 1: Combine reducers with string keys
const rootReducer = combineReducers({
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
  });

  //Only persist selected fields excluding password
  const authTransform = createTransform(
    //inboundState, This is the function that runs before persisting. It takes the current state of the auth slice (or whichever reducer you choose).
    (inboundState) => {
      //This removes password from the state using object destructuring. Everything except password is kept in rest.
      const rest = {...inboundState};
      delete rest.password;
      //Returns the filtered state (without the password) to be saved into storage.
      return rest;
  },
  //Second function: runs when rehydrating (loading from storage). In this case, we just return the state as-is, no transformation needed.
  (outboundState) => outboundState,

)

// Step 2: Persist config with whitelist
const persistConfig = {
    //This is the key used to store your Redux state in the storage engine (usually localStorage).
    //So in localStorage, your persisted state will be saved under the key:
    key: 'root',
    storage,  //storage usually refers to redux-persist/lib/storage, which is just a wrapper around window.localStorage for web.
    //Applies your custom transform(s) during the persist/rehydrate cycle.
    transforms: [authTransform],
    whitelist: ['user'] //Add your slices here
  }
// Step 3: Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const appStore= configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these actions related to redux-persist
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

//Export persistor for use in PersistGate
export const persistor = persistStore(appStore);
export default appStore;