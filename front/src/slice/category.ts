import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/redux";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";
import type { ApiResponse, Book, Category, Pagination } from "../type";
type categoryState = {
  list: Category[];
  loading: boolean;
  item: Book[];
  pagination: Pagination;
  currentPage: number;
  totalPages: number;
};
const initialState: categoryState = {
  list: [],
  loading: false,
  item: [],
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
  currentPage: 1,
  totalPages: 1,
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
      .addCase(
        getCategoryItem.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.item = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage = 1;
          state.totalPages = Math.ceil(count / results.length);
        }
      )
      .addCase(getCategoryItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategoriesByPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCategoriesByPage.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.item = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage = next
            ? Number(new URL(next).searchParams.get("page")) - 1
            : previous
            ? Number(new URL(previous).searchParams.get("page")) + 1
            : 1;
          state.totalPages = Math.ceil(count / results.length);
        }
      )
      .addCase(getCategoriesByPage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNextCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNextCategories.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.item = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage += 1;
        }
      )
      .addCase(getNextCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPreviousCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPreviousCategories.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.item = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage -= 1;
        }
      )
      .addCase(getPreviousCategories.rejected, (state) => {
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

export const getCategoryItem = createAsyncThunk<ApiResponse<Book[]>, string>(
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

export const getCategoriesByPage = createAsyncThunk<
  ApiResponse<Book[]>,
  number
>("book/getCategoriesByPage", async (page) => {
  try {
    const { data } = await axiosApi.get(`/categories/?page=${page}`);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
});

export const getNextCategories = createAsyncThunk<ApiResponse<Book[]>, string>(
  "book/getNextCategories",
  async (nextUrl) => {
    try {
      const { data } = await axiosApi.get(nextUrl);
      return data;
    } catch (error) {
      console.error("Error fetching next page of books:", error);
      throw error;
    }
  }
);

export const getPreviousCategories = createAsyncThunk<
  ApiResponse<Book[]>,
  string
>("book/getPreviousCategories", async (previousUrl) => {
  try {
    const { data } = await axiosApi.get(previousUrl);
    return data;
  } catch (error) {
    console.error("Error fetching previous page of books:", error);
    throw error;
  }
});

export const useCategories = () =>
  useAppSelector((state: RootState) => state.category);
export default categorySlice.reducer;
