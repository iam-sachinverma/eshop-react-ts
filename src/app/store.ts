import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { apiSlice } from "./api/apiSlice";

import mediaRunningReducer from "./mediaRunning/mediaRunning";
import productReducer from "./productSlice.js"
import cartReducer from "./cartSlice.js"
import categoryReducer from "./categorySlice";

//
import authSliceReducer from "features/auth/authSlice"

const isDev = process.env.NODE_ENV === "development";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  mediaRunning: mediaRunningReducer,
  product: productReducer,
  cart: cartReducer,
  category: categoryReducer,  
  auth: authSliceReducer,
  //
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);
const middlewareLogger: any = !!isDev ? logger : [];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewareLogger, apiSlice.middleware),
    devTools: true
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


