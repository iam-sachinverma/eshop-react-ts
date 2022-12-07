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

// import { fetchProducts } from "app/productSlice";

import mediaRunningReducer from "./mediaRunning/mediaRunning";
import productReducer from "./productSlice.js"
import cartReducer from "./cartSlice.js"
import authReducer from "./authSlice"

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
  auth: authReducer,
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
    }).concat(middlewareLogger),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.dispatch(fetchProducts());

