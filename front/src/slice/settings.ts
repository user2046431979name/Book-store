import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";
import { Settings } from "../type";
type settingsState = {
  list: Settings[];
  loading: boolean;
};
const initialState: settingsState = {
  list: [],
  loading: false,
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSettings.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })
      .addCase(getSettings.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const getSettings = createAsyncThunk("/getSettingsList", async () => {
  try {
    const { data } = await axiosApi.get("/settings/");
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const selectSettings = (state: RootState) => state.settings.list;
export const selectSettingsLoading = (state: RootState) =>
  state.settings.loading;

export default settingsSlice.reducer;
