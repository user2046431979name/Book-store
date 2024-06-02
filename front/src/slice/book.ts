import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../services/axiosApi";
import memoize from "memoize-one";
import { RootState } from "../app/store";
import { ApiResponse, Book, Pagination } from "../type";
import { useAppSelector } from "../app/redux";

type BookState = {
  list: Book[];
  loading: boolean;
  item: Book | null;
  pagination: Pagination;
  currentPage: number;
  totalPages: number;
};

const initialState: BookState = {
  list: [],
  loading: false,
  item: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
  currentPage: 1,
  totalPages: 1,
};

export const getBooks = createAsyncThunk<ApiResponse<Book[]>, void>(
  "book/getBooks",
  async () => {
    try {
      const { data } = await axiosApi.get("/book/");
      return data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
);

export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
  "book/getBooksByPage",
  async (page) => {
    try {
      const { data } = await axiosApi.get(`/book/?page=${page}`);
      return data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
);

export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
  "book/getNextBooks",
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

export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
  "book/getPreviousBooks",
  async (previousUrl) => {
    try {
      const { data } = await axiosApi.get(previousUrl);
      return data;
    } catch (error) {
      console.error("Error fetching previous page of books:", error);
      throw error;
    }
  }
);

export const getBookItem = createAsyncThunk<Book, string>(
  "book/getBookItem",
  async (id) => {
    try {
      const { data } = await axiosApi.get(`/book/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching book:", error);
      throw error;
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getBooks.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage = 1;
          state.totalPages = Math.ceil(count / results.length);
        }
      )
      .addCase(getBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBooksByPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getBooksByPage.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
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
      .addCase(getBooksByPage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNextBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNextBooks.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage += 1;
        }
      )
      .addCase(getNextBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPreviousBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPreviousBooks.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage -= 1;
        }
      )
      .addCase(getPreviousBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBookItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookItem.fulfilled, (state, { payload }) => {
        state.item = payload;
        state.loading = false;
      })
      .addCase(getBookItem.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const useBooks = () => useAppSelector((state: RootState) => state.book);

export default bookSlice.reducer;
