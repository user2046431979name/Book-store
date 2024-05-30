import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Lead } from "../type";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";

type leadState = {
  list: Lead[];
  loading: boolean;
};

const initialState: leadState = {
  list: [],
  loading: false,
};

export const sendQuestion = createAsyncThunk<void, Lead>(
  "/sendQuestion",
  async (question) => {
    try {
      await axiosApi.post(`/question/`, question);
    } catch (error) {
      console.log(error);
    }
  }
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendQuestion.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendQuestion.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectQuestions = (state: RootState) => state.lead.list;
export const selectQuestionLoading = (state: RootState) => state.lead.loading;

export default leadSlice.reducer;
