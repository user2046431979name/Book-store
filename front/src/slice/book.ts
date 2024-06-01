// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axiosApi from "../services/axiosApi";
// import memoize from "memoize-one";
// import { RootState } from "../app/store";
// import { ApiResponse, Book, Pagination } from "../type";
// import { useAppSelector } from "../app/redux";

// interface BookState {
//   list: Book[];
//   loading: boolean;
//   item: Book | null;
//   pagination: Pagination;
//   currentPage: number;
//   totalPages: number;
// }

// const initialState: BookState = {
//   list: [],
//   loading: false,
//   item: null,
//   pagination: {
//     count: 0,
//     next: null,
//     previous: null,
//   },
//   currentPage: 1,
//   totalPages: 1,
// };

// const itemsPerPage = 18; // Установите количество элементов на страницу

// // Асинхронные действия
// export const getBooks = createAsyncThunk<ApiResponse<Book[]>>(
//   "book/getBooks",
//   async () => {
//     const { data } = await axiosApi.get("/book/");
//     return data;
//   }
// );

// export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
//   "book/getBooksByPage",
//   async (page) => {
//     const { data } = await axiosApi.get(`/book/?page=${page}`);
//     return data;
//   }
// );

// export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
//   "book/getNextBooks",
//   async (nextUrl) => {
//     const { data } = await axiosApi.get(nextUrl);
//     return data;
//   }
// );

// export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
//   "book/getPreviousBooks",
//   async (previousUrl) => {
//     const { data } = await axiosApi.get(previousUrl);
//     return data;
//   }
// );

// export const getBookItem = createAsyncThunk<Book, string>(
//   "book/getBookItem",
//   async (id) => {
//     const { data } = await axiosApi.get(`/book/${id}`);
//     return data;
//   }
// );

// // Создание slice
// const bookSlice = createSlice({
//   name: "book",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBooks.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         state.currentPage = 1;
//         state.totalPages = Math.ceil(count / itemsPerPage);
//       })
//       .addCase(getBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getBooksByPage.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBooksByPage.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         state.currentPage = action.meta.arg;
//         state.totalPages = Math.ceil(count / itemsPerPage);
//       })
//       .addCase(getBooksByPage.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getNextBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getNextBooks.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         if (state.pagination.next) {
//           state.currentPage += 1;
//         }
//       })
//       .addCase(getNextBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getPreviousBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getPreviousBooks.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         if (state.pagination.previous) {
//           state.currentPage -= 1;
//         }
//       })
//       .addCase(getPreviousBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getBookItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBookItem.fulfilled, (state, action: PayloadAction<Book>) => {
//         state.item = action.payload;
//         state.loading = false;
//       })
//       .addCase(getBookItem.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// // Селекторы
// export const selectBooksCreatedAfterYesterday = memoize((state: RootState) => {
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   return state.book.list.filter(
//     (book) => new Date(book.created_date) > yesterday
//   );
// });

// export const useBooks = () => useAppSelector((state: RootState) => state.book);

// export default bookSlice.reducer;

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

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axiosApi from "../services/axiosApi";
// import memoize from "memoize-one";
// import { RootState } from "../app/store";
// import { ApiResponse, Book, Pagination } from "../type";
// import { useAppSelector } from "../app/redux";

// interface BookState {
//   list: Book[];
//   loading: boolean;
//   item: Book | null;
//   pagination: Pagination;
//   currentPage: number;
//   totalPages: number;
//   lastUpdated: number; // Добавляем поле для отслеживания времени последнего обновления
// }

// const initialState: BookState = {
//   list: [],
//   loading: false,
//   item: null,
//   pagination: {
//     count: 0,
//     next: null,
//     previous: null,
//   },
//   currentPage: 1,
//   totalPages: 1,
//   lastUpdated: 0, // Инициализируем как 0
// };

// // const itemsPerPage = 9; // Установите количество элементов на страницу

// // Асинхронные действия
// export const getBooks = createAsyncThunk<ApiResponse<Book[]>>(
//   "book/getBooks",
//   async () => {
//     const { data } = await axiosApi.get("/book/");
//     return data;
//   }
// );

// export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
//   "book/getBooksByPage",
//   async (page) => {
//     const { data } = await axiosApi.get(`/book/?page=${page}`);
//     return data;
//   }
// );

// export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
//   "book/getNextBooks",
//   async (nextUrl) => {
//     const { data } = await axiosApi.get(nextUrl);
//     return data;
//   }
// );

// export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
//   "book/getPreviousBooks",
//   async (previousUrl) => {
//     const { data } = await axiosApi.get(previousUrl);
//     return data;
//   }
// );

// export const getBookItem = createAsyncThunk<Book, string>(
//   "book/getBookItem",
//   async (id) => {
//     const { data } = await axiosApi.get(`/book/${id}`);
//     return data;
//   }
// );

// // Создание slice
// const bookSlice = createSlice({
//   name: "book",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBooks.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         state.currentPage = 1;
//         // state.totalPages = Math.ceil(count / itemsPerPage);
//         state.lastUpdated = Date.now(); // Обновляем время последнего обновления
//       })
//       .addCase(getBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getBooksByPage.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBooksByPage.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         state.currentPage = new URL(next || "").searchParams.get("page")
//           ? Number(new URL(next!).searchParams.get("page")) - 1
//           : 1;
//         // state.totalPages = Math.ceil(count / itemsPerPage);
//       })
//       .addCase(getBooksByPage.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getNextBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getNextBooks.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         state.currentPage += 1;
//       })
//       .addCase(getNextBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getPreviousBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getPreviousBooks.fulfilled, (state, action) => {
//         const { results, count, next, previous } = action.payload;
//         state.list = results;
//         state.pagination = { count, next, previous };
//         state.loading = false;
//         state.currentPage -= 1;
//       })
//       .addCase(getPreviousBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getBookItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBookItem.fulfilled, (state, action: PayloadAction<Book>) => {
//         state.item = action.payload;
//         state.loading = false;
//       })
//       .addCase(getBookItem.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// // Селекторы
// export const selectBooksCreatedAfterYesterday = memoize((state: RootState) => {
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   const lastUpdated = state.book.lastUpdated; // Получаем время последнего обновления
//   // Если данные были обновлены после вчерашней даты, возвращаем отфильтрованный список
//   if (lastUpdated > yesterday.getTime()) {
//     return state.book.list.filter(
//       (book) => new Date(book.created_date) > yesterday
//     );
//   } else {
//     // Иначе возвращаем пустой список
//     return [];
//   }
// });

// export const useBooks = () => useAppSelector((state: RootState) => state.book);

// export default bookSlice.reducer;

// // import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import axiosApi from "../services/axiosApi";
// // import memoize from "memoize-one";
// // import { RootState } from "../app/store";
// // import { ApiResponse, Book, Pagination } from "../type";
// // import { useAppSelector } from "../app/redux";

// // interface BookState {
// //   list: Book[];
// //   loading: boolean;
// //   item: Book | null;
// //   pagination: Pagination;
// //   currentPage: number;
// //   totalPages: number;
// // }

// // const initialState: BookState = {
// //   list: [],
// //   loading: false,
// //   item: null,
// //   pagination: {
// //     count: 0,
// //     next: null,
// //     previous: null,
// //   },
// //   currentPage: 1,
// //   totalPages: 1,
// // };

// // const itemsPerPage = 9; // Установите количество элементов на страницу

// // // Асинхронные действия
// // export const getBooks = createAsyncThunk<ApiResponse<Book[]>>(
// //   "book/getBooks",
// //   async () => {
// //     const { data } = await axiosApi.get("/book/");
// //     return data;
// //   }
// // );

// // export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
// //   "book/getBooksByPage",
// //   async (page) => {
// //     const { data } = await axiosApi.get(`/book/?page=${page}`);
// //     return data;
// //   }
// // );

// // export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// //   "book/getNextBooks",
// //   async (nextUrl) => {
// //     const { data } = await axiosApi.get(nextUrl);
// //     return data;
// //   }
// // );

// // export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// //   "book/getPreviousBooks",
// //   async (previousUrl) => {
// //     const { data } = await axiosApi.get(previousUrl);
// //     return data;
// //   }
// // );

// // export const getBookItem = createAsyncThunk<Book, string>(
// //   "book/getBookItem",
// //   async (id) => {
// //     const { data } = await axiosApi.get(`/book/${id}`);
// //     return data;
// //   }
// // );

// // // Создание slice
// // const bookSlice = createSlice({
// //   name: "book",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(getBooks.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getBooks.fulfilled, (state, action) => {
// //         const { results, count, next, previous } = action.payload;
// //         state.list = results;
// //         state.pagination = { count, next, previous };
// //         state.loading = false;
// //         state.currentPage = 1;
// //         state.totalPages = Math.ceil(count / itemsPerPage);
// //       })
// //       .addCase(getBooks.rejected, (state) => {
// //         state.loading = false;
// //       })
// //       .addCase(getBooksByPage.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getBooksByPage.fulfilled, (state, action) => {
// //         const { results, count, next, previous } = action.payload;
// //         state.list = results;
// //         state.pagination = { count, next, previous };
// //         state.loading = false;
// //         state.currentPage = action.meta.arg;
// //         state.totalPages = Math.ceil(count / itemsPerPage);
// //       })
// //       .addCase(getBooksByPage.rejected, (state) => {
// //         state.loading = false;
// //       })
// //       .addCase(getNextBooks.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getNextBooks.fulfilled, (state, action) => {
// //         const { results, count, next, previous } = action.payload;
// //         state.list = results;
// //         state.pagination = { count, next, previous };
// //         state.loading = false;
// //         if (state.pagination.next) {
// //           state.currentPage += 1;
// //         }
// //       })
// //       .addCase(getNextBooks.rejected, (state) => {
// //         state.loading = false;
// //       })
// //       .addCase(getPreviousBooks.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getPreviousBooks.fulfilled, (state, action) => {
// //         const { results, count, next, previous } = action.payload;
// //         state.list = results;
// //         state.pagination = { count, next, previous };
// //         state.loading = false;
// //         if (state.pagination.previous) {
// //           state.currentPage -= 1;
// //         }
// //       })
// //       .addCase(getPreviousBooks.rejected, (state) => {
// //         state.loading = false;
// //       })
// //       .addCase(getBookItem.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(getBookItem.fulfilled, (state, action: PayloadAction<Book>) => {
// //         state.item = action.payload;
// //         state.loading = false;
// //       })
// //       .addCase(getBookItem.rejected, (state) => {
// //         state.loading = false;
// //       });
// //   },
// // });

// // // Селекторы
// // export const selectBooksCreatedAfterYesterday = memoize((state: RootState) => {
// //   const yesterday = new Date();
// //   yesterday.setDate(yesterday.getDate() - 7);
// //   return state.book.list.filter(
// //     (book) => new Date(book.created_date) > yesterday
// //   );
// // });

// // export const useBooks = () => useAppSelector((state: RootState) => state.book);

// // export default bookSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosApi from "../services/axiosApi";
// import memoize from "memoize-one";
// import { RootState } from "../app/store";
// import { ApiResponse, Book, Pagination } from "../type";
// import { useAppSelector } from "../app/redux";

// type BookState = {
//   list: Book[];
//   loading: boolean;
//   item: Book | null;
//   pagination: Pagination;
//   currentPage: number;
//   totalPages: number;
// };

// const initialState: BookState = {
//   list: [],
//   loading: false,
//   item: null,
//   pagination: {
//     count: 0,
//     next: null,
//     previous: null,
//   },
//   currentPage: 1, // Устанавливаем начальное значение текущей страницы
//   totalPages: 1,
// };

// const itemsPerPage = 9;

// export const getBooks = createAsyncThunk<ApiResponse<Book[]>, void>(
//   "book/getBooks",
//   async () => {
//     try {
//       const { data } = await axiosApi.get("/book/");
//       return data;
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       throw error;
//     }
//   }
// );

// export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
//   "book/getBooksByPage",
//   async (page) => {
//     try {
//       const { data } = await axiosApi.get(`/book/?page=${page}`);
//       return data;
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       throw error;
//     }
//   }
// );

// export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
//   "book/getNextBooks",
//   async (nextUrl) => {
//     try {
//       const { data } = await axiosApi.get(nextUrl);
//       return data;
//     } catch (error) {
//       console.error("Error fetching next page of books:", error);
//       throw error;
//     }
//   }
// );

// export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
//   "book/getPreviousBooks",
//   async (previousUrl) => {
//     try {
//       const { data } = await axiosApi.get(previousUrl);
//       return data;
//     } catch (error) {
//       console.error("Error fetching previous page of books:", error);
//       throw error;
//     }
//   }
// );

// export const getBookItem = createAsyncThunk<Book, string>(
//   "book/getBookItem",
//   async (id) => {
//     try {
//       const { data } = await axiosApi.get(`/book/${id}`);
//       return data;
//     } catch (error) {
//       console.error("Error fetching book:", error);
//       throw error;
//     }
//   }
// );

// const bookSlice = createSlice({
//   name: "book",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(
//         getBooks.fulfilled,
//         (state, { payload: { results, count, next, previous } }) => {
//           state.list = results;
//           state.pagination = { count, next, previous };
//           state.loading = false;
//           state.currentPage = 1;
//           if (state.currentPage === 1) {
//             // Проверяем, что текущая страница - первая
//             state.totalPages = Math.ceil(count / itemsPerPage);
//           }
//         }
//       )

//       .addCase(getBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(
//         getBooksByPage.fulfilled,
//         (state, { payload: { results, count, next, previous } }) => {
//           state.list = results;
//           state.pagination = { count, next, previous };
//           state.loading = false;
//           state.currentPage = next
//             ? new URL(next).searchParams.get("page")
//               ? Number(new URL(next).searchParams.get("page")) - 1
//               : 1
//             : 1; // Корректно вычисляем текущую страницу
//           state.totalPages = Math.ceil(count / itemsPerPage);
//         }
//       )
//       .addCase(getBooksByPage.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getNextBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(
//         getNextBooks.fulfilled,
//         (state, { payload: { results, count, next, previous } }) => {
//           state.list = results;
//           state.pagination = { count, next, previous };
//           state.loading = false;
//           state.currentPage += 1;
//         }
//       )
//       .addCase(getNextBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getPreviousBooks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(
//         getPreviousBooks.fulfilled,
//         (state, { payload: { results, count, next, previous } }) => {
//           state.list = results;
//           state.pagination = { count, next, previous };
//           state.loading = false;
//           state.currentPage -= 1;
//         }
//       )
//       .addCase(getPreviousBooks.rejected, (state) => {
//         state.loading = false;
//       })
//       .addCase(getBookItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getBookItem.fulfilled, (state, { payload }) => {
//         state.item = payload;
//         state.loading = false;
//       })
//       .addCase(getBookItem.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const selectBooksCreatedAfterYesterday = memoize((state: RootState) => {
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 7);
//   return state.book.list.filter(
//     (book) => new Date(book.created_date) > yesterday
//   );
// });

// export const useBooks = () => useAppSelector((state: RootState) => state.book);

// export default bookSlice.reducer;

// // // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // // import axiosApi from "../services/axiosApi";
// // // import memoize from "memoize-one";
// // // import { RootState } from "../app/store";
// // // import { ApiResponse, Book, Pagination } from "../type";
// // // import { useAppSelector } from "../app/redux";

// // // type BookState = {
// // //   list: Book[];
// // //   loading: boolean;
// // //   item: Book | null;
// // //   pagination: Pagination;
// // //   currentPage: number;
// // //   totalPages: number;
// // // };

// // // const initialState: BookState = {
// // //   list: [],
// // //   loading: false,
// // //   item: null,
// // //   pagination: {
// // //     count: 0,
// // //     next: null,
// // //     previous: null,
// // //   },
// // //   currentPage: 1,
// // //   totalPages: 1,
// // // };

// // // const itemsPerPage = 9; // Set your items per page here

// // // export const getBooks = createAsyncThunk<ApiResponse<Book[]>, void>(
// // //   "book/getBooks",
// // //   async () => {
// // //     try {
// // //       const { data } = await axiosApi.get("/book/");
// // //       return data;
// // //     } catch (error) {
// // //       console.error("Error fetching books:", error);
// // //       throw error;
// // //     }
// // //   }
// // // );

// // // export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
// // //   "book/getBooksByPage",
// // //   async (page) => {
// // //     try {
// // //       const { data } = await axiosApi.get(`/book/?page=${page}`);
// // //       return data;
// // //     } catch (error) {
// // //       console.error("Error fetching books:", error);
// // //       throw error;
// // //     }
// // //   }
// // // );

// // // export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// // //   "book/getNextBooks",
// // //   async (nextUrl) => {
// // //     try {
// // //       const { data } = await axiosApi.get(nextUrl);
// // //       return data;
// // //     } catch (error) {
// // //       console.error("Error fetching next page of books:", error);
// // //       throw error;
// // //     }
// // //   }
// // // );

// // // export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// // //   "book/getPreviousBooks",
// // //   async (previousUrl) => {
// // //     try {
// // //       const { data } = await axiosApi.get(previousUrl);
// // //       return data;
// // //     } catch (error) {
// // //       console.error("Error fetching previous page of books:", error);
// // //       throw error;
// // //     }
// // //   }
// // // );

// // // export const getBookItem = createAsyncThunk<Book, string>(
// // //   "book/getBookItem",
// // //   async (id) => {
// // //     try {
// // //       const { data } = await axiosApi.get(`/book/${id}`);
// // //       return data;
// // //     } catch (error) {
// // //       console.error("Error fetching book:", error);
// // //       throw error;
// // //     }
// // //   }
// // // );

// // // const bookSlice = createSlice({
// // //   name: "book",
// // //   initialState,
// // //   reducers: {},
// // //   extraReducers: (builder) => {
// // //     builder
// // //       .addCase(getBooks.pending, (state) => {
// // //         state.loading = true;
// // //       })
// // //       .addCase(
// // //         getBooks.fulfilled,
// // //         (state, { payload: { results, count, next, previous } }) => {
// // //           state.list = results;
// // //           state.pagination = { count, next, previous };
// // //           state.loading = false;
// // //           state.currentPage = 1;
// // //           state.totalPages = Math.ceil(count / itemsPerPage);
// // //         }
// // //       )
// // //       .addCase(getBooks.rejected, (state) => {
// // //         state.loading = false;
// // //       })
// // //       .addCase(getBooksByPage.pending, (state) => {
// // //         state.loading = true;
// // //       })
// // //       .addCase(
// // //         getBooksByPage.fulfilled,
// // //         (state, { payload: { results, count, next, previous } }) => {
// // //           state.list = results;
// // //           state.pagination = { count, next, previous };
// // //           state.loading = false;
// // //           state.currentPage = next
// // //             ? new URL(next).searchParams.get("page")
// // //               ? Number(new URL(next).searchParams.get("page")) - 1
// // //               : 1
// // //             : 1;
// // //           state.totalPages = Math.ceil(count / itemsPerPage);
// // //         }
// // //       )
// // //       .addCase(getBooksByPage.rejected, (state) => {
// // //         state.loading = false;
// // //       })
// // //       .addCase(getNextBooks.pending, (state) => {
// // //         state.loading = true;
// // //       })
// // //       .addCase(
// // //         getNextBooks.fulfilled,
// // //         (state, { payload: { results, count, next, previous } }) => {
// // //           state.list = results;
// // //           state.pagination = { count, next, previous };
// // //           state.loading = false;
// // //           state.currentPage += 1;
// // //         }
// // //       )
// // //       .addCase(getNextBooks.rejected, (state) => {
// // //         state.loading = false;
// // //       })
// // //       .addCase(getPreviousBooks.pending, (state) => {
// // //         state.loading = true;
// // //       })
// // //       .addCase(
// // //         getPreviousBooks.fulfilled,
// // //         (state, { payload: { results, count, next, previous } }) => {
// // //           state.list = results;
// // //           state.pagination = { count, next, previous };
// // //           state.loading = false;
// // //           state.currentPage -= 1;
// // //         }
// // //       )
// // //       .addCase(getPreviousBooks.rejected, (state) => {
// // //         state.loading = false;
// // //       })
// // //       .addCase(getBookItem.pending, (state) => {
// // //         state.loading = true;
// // //       })
// // //       .addCase(getBookItem.fulfilled, (state, { payload }) => {
// // //         state.item = payload;
// // //         state.loading = false;
// // //       })
// // //       .addCase(getBookItem.rejected, (state) => {
// // //         state.loading = false;
// // //       });
// // //   },
// // // });

// // // export const selectBooksCreatedAfterYesterday = memoize((state: RootState) => {
// // //   const yesterday = new Date();
// // //   yesterday.setDate(yesterday.getDate() - 1);
// // //   return state.book.list.filter(
// // //     (book) => new Date(book.created_date) > yesterday
// // //   );
// // // });

// // // export const useBooks = () => useAppSelector((state: RootState) => state.book);

// // // export default bookSlice.reducer;

// // // // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // // // import axiosApi from "../services/axiosApi";
// // // // import memoize from "memoize-one";
// // // // import { RootState } from "../app/store";
// // // // import { ApiResponse, Book, Pagination } from "../type";
// // // // import { useAppSelector } from "../app/redux";

// // // // type BookState = {
// // // //   list: Book[];
// // // //   loading: boolean;
// // // //   item: Book | null;
// // // //   pagination: Pagination;
// // // //   currentPage: number;
// // // //   totalPages: number;
// // // // };

// // // // const initialState: BookState = {
// // // //   list: [],
// // // //   loading: false,
// // // //   item: null,
// // // //   pagination: {
// // // //     count: 0,
// // // //     next: null,
// // // //     previous: null,
// // // //   },
// // // //   currentPage: 1,
// // // //   totalPages: 1,
// // // // };

// // // // export const getBooks = createAsyncThunk<ApiResponse<Book[]>, void>(
// // // //   "book/getBooks",
// // // //   async () => {
// // // //     try {
// // // //       const { data } = await axiosApi.get("/book/");
// // // //       return data;
// // // //     } catch (error) {
// // // //       console.error("Error fetching books:", error);
// // // //       throw error;
// // // //     }
// // // //   }
// // // // );

// // // // export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
// // // //   "book/getBooksByPage",
// // // //   async (page) => {
// // // //     try {
// // // //       const { data } = await axiosApi.get(`/book/?page=${page}`);
// // // //       return data;
// // // //     } catch (error) {
// // // //       console.error("Error fetching books:", error);
// // // //       throw error;
// // // //     }
// // // //   }
// // // // );

// // // // export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// // // //   "book/getNextBooks",
// // // //   async (nextUrl) => {
// // // //     try {
// // // //       const { data } = await axiosApi.get(nextUrl);
// // // //       return data;
// // // //     } catch (error) {
// // // //       console.error("Error fetching next page of books:", error);
// // // //       throw error;
// // // //     }
// // // //   }
// // // // );

// // // // export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// // // //   "book/getPreviousBooks",
// // // //   async (previousUrl) => {
// // // //     try {
// // // //       const { data } = await axiosApi.get(previousUrl);
// // // //       return data;
// // // //     } catch (error) {
// // // //       console.error("Error fetching previous page of books:", error);
// // // //       throw error;
// // // //     }
// // // //   }
// // // // );

// // // // export const getBookItem = createAsyncThunk<Book, string>(
// // // //   "book/getBookItem",
// // // //   async (id) => {
// // // //     try {
// // // //       const { data } = await axiosApi.get(`/book/${id}`);
// // // //       return data;
// // // //     } catch (error) {
// // // //       console.error("Error fetching book:", error);
// // // //       throw error;
// // // //     }
// // // //   }
// // // // );

// // // // const bookSlice = createSlice({
// // // //   name: "book",
// // // //   initialState,
// // // //   reducers: {},
// // // //   extraReducers: (builder) => {
// // // //     builder
// // // //       .addCase(getBooks.pending, (state) => {
// // // //         state.loading = true;
// // // //       })
// // // //       .addCase(
// // // //         getBooks.fulfilled,
// // // //         (state, { payload: { results, count, next, previous } }) => {
// // // //           state.list = results;
// // // //           state.pagination = { count, next, previous };
// // // //           state.loading = false;
// // // //           state.currentPage = 1;
// // // //           state.totalPages = Math.ceil(count / results.length);
// // // //         }
// // // //       )
// // // //       .addCase(getBooks.rejected, (state) => {
// // // //         state.loading = false;
// // // //       })
// // // //       .addCase(getBooksByPage.pending, (state) => {
// // // //         state.loading = true;
// // // //       })
// // // //       .addCase(
// // // //         getBooksByPage.fulfilled,
// // // //         (state, { payload: { results, count, next, previous } }) => {
// // // //           state.list = results;
// // // //           state.pagination = { count, next, previous };
// // // //           state.loading = false;
// // // //           state.currentPage = next
// // // //             ? Number(new URL(next).searchParams.get("page")) - 1
// // // //             : previous
// // // //             ? Number(new URL(previous).searchParams.get("page")) + 1
// // // //             : 1;
// // // //           state.totalPages = Math.ceil(count / results.length);
// // // //         }
// // // //       )
// // // //       .addCase(getBooksByPage.rejected, (state) => {
// // // //         state.loading = false;
// // // //       })
// // // //       .addCase(getNextBooks.pending, (state) => {
// // // //         state.loading = true;
// // // //       })
// // // //       .addCase(
// // // //         getNextBooks.fulfilled,
// // // //         (state, { payload: { results, count, next, previous } }) => {
// // // //           state.list = results;
// // // //           state.pagination = { count, next, previous };
// // // //           state.loading = false;
// // // //           state.currentPage += 1;
// // // //         }
// // // //       )
// // // //       .addCase(getNextBooks.rejected, (state) => {
// // // //         state.loading = false;
// // // //       })
// // // //       .addCase(getPreviousBooks.pending, (state) => {
// // // //         state.loading = true;
// // // //       })
// // // //       .addCase(
// // // //         getPreviousBooks.fulfilled,
// // // //         (state, { payload: { results, count, next, previous } }) => {
// // // //           state.list = results;
// // // //           state.pagination = { count, next, previous };
// // // //           state.loading = false;
// // // //           state.currentPage -= 1;
// // // //         }
// // // //       )
// // // //       .addCase(getPreviousBooks.rejected, (state) => {
// // // //         state.loading = false;
// // // //       })
// // // //       .addCase(getBookItem.pending, (state) => {
// // // //         state.loading = true;
// // // //       })
// // // //       .addCase(getBookItem.fulfilled, (state, { payload }) => {
// // // //         state.item = payload;
// // // //         state.loading = false;
// // // //       })
// // // //       .addCase(getBookItem.rejected, (state) => {
// // // //         state.loading = false;
// // // //       });
// // // //   },
// // // // });

// // // // export const selectBooksCreatedAfterYesterday = memoize((state: RootState) => {
// // // //   const yesterday = new Date();
// // // //   yesterday.setDate(yesterday.getDate() - 1);
// // // //   return state.book.list.filter(
// // // //     (book) => new Date(book.created_date) > yesterday
// // // //   );
// // // // });

// // // // export const useBooks = () => useAppSelector((state: RootState) => state.book);

// // // // export default bookSlice.reducer;

// // // // // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // // // // import axiosApi from "../services/axiosApi";
// // // // // import memoize from "memoize-one";
// // // // // import { RootState } from "../app/store";
// // // // // import { ApiResponse, Book, Pagination } from "../type";
// // // // // import { useAppSelector } from "../app/redux";

// // // // // type BookState = {
// // // // //   list: Book[];
// // // // //   loading: boolean;
// // // // //   item: Book | null;
// // // // //   pagination: Pagination;
// // // // //   currentPage: number;
// // // // //   totalPages: number;
// // // // // };

// // // // // const initialState: BookState = {
// // // // //   list: [],
// // // // //   loading: false,
// // // // //   item: null,
// // // // //   pagination: {
// // // // //     count: 0,
// // // // //     next: null,
// // // // //     previous: null,
// // // // //   },
// // // // //   currentPage: 1,
// // // // //   totalPages: 1,
// // // // // };

// // // // // const bookSlice = createSlice({
// // // // //   name: "book",
// // // // //   initialState,
// // // // //   reducers: {},
// // // // //   extraReducers: (builder) => {
// // // // //     builder
// // // // //       .addCase(getBooks.pending, (state) => {
// // // // //         state.loading = true;
// // // // //       })
// // // // //       .addCase(
// // // // //         getBooks.fulfilled,
// // // // //         (state, { payload: { results, count, next, previous } }) => {
// // // // //           state.list = results;
// // // // //           state.pagination = { count, next, previous };
// // // // //           state.loading = false;
// // // // //           state.currentPage = 1;
// // // // //           state.totalPages = Math.ceil(count / results.length);
// // // // //         }
// // // // //       )
// // // // //       .addCase(getBooks.rejected, (state) => {
// // // // //         state.loading = false;
// // // // //       })
// // // // //       .addCase(getBooksByPage.pending, (state) => {
// // // // //         state.loading = true;
// // // // //       })
// // // // //       .addCase(
// // // // //         getBooksByPage.fulfilled,
// // // // //         (state, { payload: { results, count, next, previous } }) => {
// // // // //           state.list = results;
// // // // //           state.pagination = { count, next, previous };
// // // // //           state.loading = false;
// // // // //           state.currentPage = next
// // // // //             ? Number(new URL(next).searchParams.get("page")) - 1
// // // // //             : previous
// // // // //             ? Number(new URL(previous).searchParams.get("page")) + 1
// // // // //             : 1;
// // // // //           state.totalPages = Math.ceil(count / results.length);
// // // // //         }
// // // // //       )
// // // // //       .addCase(getBooksByPage.rejected, (state) => {
// // // // //         state.loading = false;
// // // // //       })
// // // // //       .addCase(getNextBooks.pending, (state) => {
// // // // //         state.loading = true;
// // // // //       })
// // // // //       .addCase(
// // // // //         getNextBooks.fulfilled,
// // // // //         (state, { payload: { results, count, next, previous } }) => {
// // // // //           state.list = results;
// // // // //           state.pagination = { count, next, previous };
// // // // //           state.loading = false;
// // // // //           state.currentPage += 1;
// // // // //         }
// // // // //       )
// // // // //       .addCase(getNextBooks.rejected, (state) => {
// // // // //         state.loading = false;
// // // // //       })
// // // // //       .addCase(getPreviousBooks.pending, (state) => {
// // // // //         state.loading = true;
// // // // //       })
// // // // //       .addCase(
// // // // //         getPreviousBooks.fulfilled,
// // // // //         (state, { payload: { results, count, next, previous } }) => {
// // // // //           state.list = results;
// // // // //           state.pagination = { count, next, previous };
// // // // //           state.loading = false;
// // // // //           state.currentPage -= 1;
// // // // //         }
// // // // //       )
// // // // //       .addCase(getPreviousBooks.rejected, (state) => {
// // // // //         state.loading = false;
// // // // //       })
// // // // //       .addCase(getBookItem.pending, (state) => {
// // // // //         state.loading = true;
// // // // //       })
// // // // //       .addCase(getBookItem.fulfilled, (state, { payload }) => {
// // // // //         state.item = payload;
// // // // //         state.loading = false;
// // // // //       })
// // // // //       .addCase(getBookItem.rejected, (state) => {
// // // // //         state.loading = false;
// // // // //       });
// // // // //   },
// // // // // });

// // // // // export const getBooks = createAsyncThunk<ApiResponse<Book[]>, void>(
// // // // //   "book/getBooks",
// // // // //   async () => {
// // // // //     try {
// // // // //       const { data } = await axiosApi.get("/book/");
// // // // //       return data;
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching books:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   }
// // // // // );

// // // // // export const getBooksByPage = createAsyncThunk<ApiResponse<Book[]>, number>(
// // // // //   "book/getBooksByPage",
// // // // //   async (page) => {
// // // // //     try {
// // // // //       const { data } = await axiosApi.get(`/book/?page=${page}`);
// // // // //       return data;
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching books:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   }
// // // // // );

// // // // // export const getNextBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// // // // //   "book/getNextBooks",
// // // // //   async (nextUrl) => {
// // // // //     try {
// // // // //       const { data } = await axiosApi.get(nextUrl);
// // // // //       return data;
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching next page of books:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   }
// // // // // );

// // // // // export const getPreviousBooks = createAsyncThunk<ApiResponse<Book[]>, string>(
// // // // //   "book/getPreviousBooks",
// // // // //   async (previousUrl) => {
// // // // //     try {
// // // // //       const { data } = await axiosApi.get(previousUrl);
// // // // //       return data;
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching previous page of books:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   }
// // // // // );

// // // // // export const getBookItem = createAsyncThunk<Book, string>(
// // // // //   "book/getBookItem",
// // // // //   async (id) => {
// // // // //     try {
// // // // //       const { data } = await axiosApi.get(`/book/${id}`);
// // // // //       return data;
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching book:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   }
// // // // // );

// // // // // export const selectBooksCreatedAfterYesterday = memoize((state: RootState) => {
// // // // //   const yesterday = new Date();
// // // // //   yesterday.setDate(yesterday.getDate() - 7);
// // // // //   return state.book.list.filter(
// // // // //     (book) => new Date(book.created_date) > yesterday
// // // // //   );
// // // // // });

// // // // // export const useBooks = () => useAppSelector((state: RootState) => state.book);

// // // // // export default bookSlice.reducer;
