import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../slice/book";
import categoryReducer from "../slice/category";
import searchReducer from "../slice/search";
export const store = configureStore({
  reducer: {
    book: bookReducer,
    category: categoryReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
