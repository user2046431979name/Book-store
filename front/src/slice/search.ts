import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book, SearchBook, Pagination, ApiResponse } from "../type";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";
import { useAppSelector } from "../app/redux";

type searchState = {
  list: Book[];
  loading: boolean;
  pagination: Pagination;
  currentPage: number;
  totalPages: number;
};

const initialState: searchState = {
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

export const setSearch = createAsyncThunk(
  "search/setSearch",
  async (search: SearchBook | null) => {
    const { data } = await axiosApi.get("/books/", {
      params: search,
    });
    return data;
  }
);

export const getNextSearchs = createAsyncThunk<ApiResponse<Book[]>, string>(
  "book/getNextSearchs",
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

export const getPreviousSearchs = createAsyncThunk<ApiResponse<Book[]>, string>(
  "book/getPreviousSearchs",
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
        const { results, count, next, previous } = action.payload;
        state.loading = false;
        state.list = results;
        state.pagination = { count, next, previous };
        state.currentPage = 1;
        state.totalPages = Math.ceil(count / results.length);
      })
      .addCase(setSearch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNextSearchs.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNextSearchs.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage += 1;
        }
      )
      .addCase(getNextSearchs.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPreviousSearchs.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPreviousSearchs.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage -= 1;
        }
      )
      .addCase(getPreviousSearchs.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const useSearch = () =>
  useAppSelector((state: RootState) => state.search);
export default searchSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { Book, SearchBook } from "../type";
// import { RootState } from "../app/store";
// import axiosApi from "../services/axiosApi";

// type searchState = {
//   list: Book[];
//   loading: boolean;
// };

// const initialState: searchState = {
//   list: [],
//   loading: false,
// };

// export const setSearch = createAsyncThunk(
//   "search/setSearch",
//   async (search: SearchBook) => {
//     const { data } = await axiosApi.get("/books/", {
//       params: search,
//     });
//     return <Book[]>data.results;
//   }
// );

// const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(setSearch.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(setSearch.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(setSearch.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const selectSearchs = (state: RootState) => state.search.list;
// export const selectSearchLoading = (state: RootState) => state.search.loading;

// export default searchSlice.reducer;
