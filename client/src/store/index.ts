import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChartDataState {
  selectedMonth: { startDate: string; endDate: string; region: string }[];
  selectedYear: { startDate: string; endDate: string; region: string }[];
}

const initialState: ChartDataState = {
  selectedMonth: [],
  selectedYear: [],
};

const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    addMonth(
      state,
      action: PayloadAction<{
        startDate: string;
        endDate: string;
        region: string;
      }>
    ) {
      state.selectedMonth.push(action.payload);
    },
    addYear(
      state,
      action: PayloadAction<{
        startDate: string;
        endDate: string;
        region: string;
      }>
    ) {
      state.selectedYear.push(action.payload);
    },
    removeMonth(
      state,
      action: PayloadAction<{
        startDate: string;
        endDate: string;
        region: string;
      }>
    ) {
      state.selectedMonth = state.selectedMonth.filter(
        (item) =>
          !(
            item.startDate === action.payload.startDate &&
            item.endDate === action.payload.endDate &&
            item.region === action.payload.region
          )
      );
    },
    removeYear(
      state,
      action: PayloadAction<{
        startDate: string;
        endDate: string;
        region: string;
      }>
    ) {
      state.selectedYear = state.selectedYear.filter(
        (item) =>
          !(
            item.startDate === action.payload.startDate &&
            item.endDate === action.payload.endDate &&
            item.region === action.payload.region
          )
      );
    },
  },
});

export const { addMonth, addYear, removeMonth, removeYear } =
  chartDataSlice.actions;

const store = configureStore({
  reducer: {
    chartData: chartDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
