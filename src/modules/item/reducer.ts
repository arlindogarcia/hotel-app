import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Categoria } from "./types/categoria";

type TInitialState = {
  isLoadingList: boolean;
  isLoading: boolean;
  error: string;
  success: string;
  categorias: Categoria[];
  categoria: Categoria | null;
};

const initialState: TInitialState = {
  isLoadingList: false,
  isLoading: false,
  error: "",
  success: "",
  categorias: [],
  categoria: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    requestError(
      state: TInitialState,
      { payload }: PayloadAction<string>
    ) {
      state.isLoadingList = false;
      state.isLoading = false;
      state.error = payload;
      state.success = "";
    },
    // CATEGORIA
    requestCategorias(state: TInitialState) {
      state.isLoadingList = true;
      state.error = "";
      state.success = "";
    },
    requestCategoriasSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Categoria[]>
    ) {
      state.isLoadingList = false;
      state.categorias = payload;
    },
    requestCategoria(state: TInitialState, _: PayloadAction<{ id: string }>) {
      state.error = "";
      state.success = "";
    },
    requestCategoriaSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Categoria>
    ) {
      state.categoria = payload;
    },
    requestSaveCategoria(
      state: TInitialState,
      { payload }: PayloadAction<Categoria>
    ) {
      state.isLoading = true;
    },
    requestSaveCategoriaSuccess(
      state: TInitialState,
      { payload }: PayloadAction<Categoria>
    ) {
      state.error = "";
      state.success = "Categoria salva com sucesso.";
      state.categoria = payload;
      state.isLoading = false;
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
