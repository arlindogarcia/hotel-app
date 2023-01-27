import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../login/reducer";
import { mainSaga } from "./mainSaga";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import sistemaSlice from "../sistema/reducer";
import clienteSlice from "../cliente/reducer";
import itemSlice from "../item/reducer";
import pedidoSlice from "../pedido/reducer";
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const persistConfig = {
  key: "hotel_app",
  storage,
};
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  sistema: sistemaSlice.reducer,
  cliente: clienteSlice.reducer,
  item: itemSlice.reducer,
  pedido: pedidoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, sagaMiddleware],
});
export const persistor = persistStore(store);

sagaMiddleware.run(mainSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
