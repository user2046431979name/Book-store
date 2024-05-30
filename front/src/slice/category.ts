import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/redux";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";
import type { Book, Category } from "../type";
type categoryState = {
  list: Category[];
  loading: boolean;
  item: Book[];
};
const initialState: categoryState = {
  list: [],
  loading: false,
  item: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategoryItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryItem.fulfilled, (state, { payload }) => {
        state.item = payload;
        state.loading = false;
      })
      .addCase(getCategoryItem.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getCategories = createAsyncThunk("/getCategoryList", async () => {
  try {
    const { data } = await axiosApi.get("/categories/");
    return data.results;
  } catch (error) {
    console.log(error);
  }
});

export const getCategoryItem = createAsyncThunk<Book[], string>(
  "/getCategoryItem",
  async (id) => {
    try {
      const { data } = await axiosApi.get(`/categories/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const useCategories = () =>
  useAppSelector((state: RootState) => state.category);
export default categorySlice.reducer;
