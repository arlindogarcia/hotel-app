import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../login/reducer";
import { mainSaga } from "./mainSaga";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import sistemaSlice from "../sistema/reducer";
import clienteSlice from "../cliente/reducer";
import itemSlice from "../item/reducer";
import usuarioTemporarioSlice from "../usuario_temporario/reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    login: persistReducer({
      key: 'login',
      storage: storage,
    }, loginSlice.reducer),
    sistema: persistReducer({
      key: 'sistema',
      storage: storage,
    }, sistemaSlice.reducer),
    cliente: persistReducer({
      key: 'cliente',
      storage: storage,
    }, clienteSlice.reducer),
    item: persistReducer({
      key: 'item',
      storage: storage,
    }, itemSlice.reducer),
    usuario_temporario: persistReducer({
      key: 'usuario_temporario',
      storage: storage,
    }, usuarioTemporarioSlice.reducer),
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(mainSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
