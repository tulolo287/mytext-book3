import { combineReducers, createStore, applyMiddleware } from "redux";
import cartReducer from "../features/cart/cartSlice";
import catalogReducer from "../features/catalog/catalogSlice";
import userReducer from "../features/user/userSlice";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { getCartLocalStorage, setCartLocalStorage } from "../uilities";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  cart: cartReducer,
  catalog: catalogReducer,
  user: userReducer
});
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const preloadedState = {
  cart: { cart: getCartLocalStorage(), isCartModal: false }
};
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(thunk)
});

store.subscribe(() => {
  // setCartLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//window.state = store.getState;

let persistor = persistStore(store);
export { store, persistor };
