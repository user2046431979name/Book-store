import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Category } from "../type";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";
import { useAppSelector } from "../app/redux";
type categoryState = {
  list: Category[];
  loading: boolean;
  item: Category | null;
};
const initialState: categoryState = {
  list: [],
  loading: false,
  item: null,
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

export const getCategoryItem = createAsyncThunk<Category, string>(
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

export const selectCategories = (state: RootState) => state.category.list;
export const selectCategoryItem = (state: RootState) => state.category.item;
export const selectCategoryLoading = (state: RootState) =>
  state.category.loading;

export default categorySlice.reducer;
