import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../services/axiosApi";
import { Settings } from "../type";
import { useAppSelector } from "../app/redux";
type settingsState = {
  list: Settings[];
  loading: boolean;
  item: Settings | null;
};
const initialState: settingsState = {
  list: [],
  loading: false,
  item: null,
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
      })
      .addCase(getSettingsObject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSettingsObject.fulfilled, (state, { payload }) => {
        state.item = payload;
        state.loading = false;
      })
      .addCase(getSettingsObject.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const getSettings = createAsyncThunk("/getSettingsList", async () => {
  try {
    const { data } = await axiosApi.get("/settings/");
    return data.results;
  } catch (error) {
    console.log(error);
  }
});
export const getSettingsObject = createAsyncThunk(
  "/getSettingsObject",
  async () => {
    try {
      const { data } = await axiosApi.get("/settings/");
      return data.results[0];
    } catch (error) {
      console.log(error);
    }
  }
);
export const useSettings = () =>
  useAppSelector((state: RootState) => state.settings);

export default settingsSlice.reducer;
