import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book, SearchBook } from "../type";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";

type searchState = {
  list: Book[];
  loading: boolean;
};

const initialState: searchState = {
  list: [],
  loading: false,
};

export const setSearch = createAsyncThunk(
  "search/setSearch",
  async (search: SearchBook) => {
    const { data } = await axiosApi.get("/books/", {
      params: search,
    });
    return <Book[]>data.results;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(setSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(setSearch.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectSearchs = (state: RootState) => state.search.list;
export const selectSearchLoading = (state: RootState) => state.search.loading;

export default searchSlice.reducer;
