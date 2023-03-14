import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../model/IBook";
import { RootState, AppDispatch } from "../../store";

const initialState = {
  catalog: [] as IBook[],
  isLoading: false,
  error: null,
};

export const fetchCatalog = createAsyncThunk("catalog/fetchAll", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=10"
  );
  const data = await res.json();
  return data;
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCatalog: (state, action: PayloadAction<IBook[]>) => {
      state.catalog = action.payload;
    },
    loadingOn: (state) => {
      state.isLoading = true;
    },
    loadingOff: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatalog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCatalog.fulfilled, (state, action) => {
      state.catalog = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCatalog.rejected, (state, action) => {
      //state.error = action.error;
      console.log("Action", action);
      state.isLoading = true;
    });
  },
});

export const { setCatalog, loadingOff, loadingOn } = catalogSlice.actions;
export const selectCatalog = (state: RootState) => state.catalog;
export default catalogSlice.reducer;
