import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChartDataState {
  selectedMonth: {
    startDate: string;
    endDate: string;
    region: string;
    data: {
      x: string;
      avgTa: number | null;
      maxTa: number | null;
      minTa: number | null;
      avgRhm: number | null;
      sumRn: number | null;
      avgWs: number | null;
    }[];
  }[];
  selectedYear: {
    startDate: string;
    endDate: string;
    region: string;
    data: {
      x: string;
      avgTa: number | null;
      maxTa: number | null;
      minTa: number | null;
      avgRhm: number | null;
      sumRn: number | null;
      avgWs: number | null;
    }[];
  }[];
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
        data: {
          x: string;
          avgTa: number | null;
          maxTa: number | null;
          minTa: number | null;
          avgRhm: number | null;
          sumRn: number | null;
          avgWs: number | null;
        }[];
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
        data: {
          x: string;
          avgTa: number | null;
          maxTa: number | null;
          minTa: number | null;
          avgRhm: number | null;
          sumRn: number | null;
          avgWs: number | null;
        }[];
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

export const { addMonth, removeMonth, addYear, removeYear } =
  chartDataSlice.actions;

const store = configureStore({
  reducer: {
    chartData: chartDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
