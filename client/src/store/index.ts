import dayjs from "dayjs";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChartDataState } from "types/data";

const initialState: ChartDataState = {
  selectedMonth: [],
  selectedYear: [],
  // avgTaDistMonth: new Array<number>(7).fill(0),
  // avgTaDistYear: new Array<number>(7).fill(0),
  dataTypeMonth: "avgTa",
  dataTypeYear: "avgTa",
  dateValueMonth: dayjs().subtract(1, "day").date(1).format("YYYYMM01"),
  dateValueYear: dayjs().subtract(1, "day").date(1).format("YYYY0101"),
  regionValueMonth: "",
  regionValueYear: "",
  dataLabelMonth: false,
  dataLabelYear: false,
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
    // updateAvgTaDistMonth(state, action: PayloadAction<number[]>) {
    //   state.avgTaDistMonth = action.payload;
    // },
    // updateAvgTaDistYear(state, action: PayloadAction<number[]>) {
    //   state.avgTaDistYear = action.payload;
    // },
    setDataTypeMonth(state, action: PayloadAction<string>) {
      state.dataTypeMonth = action.payload;
    },
    setDataTypeYear(state, action: PayloadAction<string>) {
      state.dataTypeYear = action.payload;
    },
    setDateValueMonth(state, action: PayloadAction<string>) {
      state.dateValueMonth = action.payload;
    },
    setDateValueYear(state, action: PayloadAction<string>) {
      state.dateValueYear = action.payload;
    },
    setRegionValueMonth(state, action: PayloadAction<string>) {
      state.regionValueMonth = action.payload;
    },
    setRegionValueYear(state, action: PayloadAction<string>) {
      state.regionValueYear = action.payload;
    },
    setDataLabelMonth(state) {
      state.dataLabelMonth = !state.dataLabelMonth;
    },
    setDataLabelYear(state) {
      state.dataLabelYear = !state.dataLabelYear;
    },
  },
});

export const {
  addMonth,
  addYear,
  removeMonth,
  removeYear,
  // updateAvgTaDistMonth,
  // updateAvgTaDistYear,
  setDataTypeMonth,
  setDataTypeYear,
  setDateValueMonth,
  setDateValueYear,
  setRegionValueMonth,
  setRegionValueYear,
  setDataLabelMonth,
  setDataLabelYear,
} = chartDataSlice.actions;

const store = configureStore({
  reducer: {
    chartData: chartDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
