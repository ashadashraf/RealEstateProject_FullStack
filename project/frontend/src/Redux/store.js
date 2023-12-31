import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import signupReducer from './authModal/signupModalSlice';
import signinReducer from './authModal/signinModalSlice';
import LoggedinReducer from './authModal/isLoggedinSlice';
import GoogleLoggedinReducer from './authModal/isGoogleLoggedinSlice';
import propertyAddressReducer from './sellPropertyDetails/propertyAddressSlice';
import propertiesListReducer from './userProperty/propertiesListSlice';
import propertyDetailReducer from './userProperty/propertyDetailSlice';
import chatMessagesReducer from './chatData/chatMessageSlice';
import focusCoordinatesReducer from './mapCoordinates/focusCoordinatesSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    showSignupModal: signupReducer,
    showSigninModal: signinReducer,
    showIsLoggedin: LoggedinReducer,
    showIsGoogleLoggedin: GoogleLoggedinReducer,
    showPropertyAddress: propertyAddressReducer,
    showPropertiesList: propertiesListReducer,
    showPropertyDetail: propertyDetailReducer,
    chatMessages: chatMessagesReducer,
    focusCoordinates: focusCoordinatesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };