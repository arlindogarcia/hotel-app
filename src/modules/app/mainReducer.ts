import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../login/reducer";
import { mainSaga } from "./mainSaga";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import sistemaSlice from "../sistema/reducer";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: storage,
};

export const store = configureStore({
  reducer: {
    login: persistReducer(persistConfig, loginSlice.reducer),
    sistema: persistReducer(persistConfig, sistemaSlice.reducer),
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mainSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
