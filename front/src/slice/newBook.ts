import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/redux";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";
import { ApiResponse, Book, Pagination } from "../type";

type NewBookState = {
  list: Book[];
  loading: boolean;
  pagination: Pagination;
  currentPage: number;
  totalPages: number;
};

const initialState: NewBookState = {
  list: [],
  loading: false,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
  currentPage: 1,
  totalPages: 1,
};

export const getNewBooks = createAsyncThunk<ApiResponse<Book[]>, void>(
  "book/getBooks",
  async () => {
    try {
      const { data } = await axiosApi.get("/newBooks/");
      return data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
);

export const getNewBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
  "book/getBooksByPage",
  async (page) => {
    try {
      const { data } = await axiosApi.get(`/newBooks/?page=${page}`);
      return data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
);

export const getNewNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
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

export const getNewPreviousBooks = createAsyncThunk<
  ApiResponse<Book[]>,
  string
>("book/getPreviousBooks", async (previousUrl) => {
  try {
    const { data } = await axiosApi.get(previousUrl);
    return data;
  } catch (error) {
    console.error("Error fetching previous page of books:", error);
    throw error;
  }
});

const newBookSlice = createSlice({
  name: "newBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNewBooks.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage = 1;
          state.totalPages = Math.ceil(count / results.length);
        }
      )
      .addCase(getNewBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNewBooksByPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNewBooksByPage.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results.reverse();
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
      .addCase(getNewBooksByPage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNewNextBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNewNextBooks.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage += 1;
        }
      )
      .addCase(getNewNextBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNewPreviousBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNewPreviousBooks.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage -= 1;
        }
      )
      .addCase(getNewPreviousBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const useNewBooks = () =>
  useAppSelector((state: RootState) => state.newBook);

export default newBookSlice.reducer;
