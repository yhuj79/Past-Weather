import dayjs from "dayjs";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChartDataState } from "types/data";

// ChartDataState 초기 상태 정의
const initialState: ChartDataState = {
  selectedMonth: [], // 선택된 월별 데이터 배열
  selectedYear: [], // 선택된 연도별 데이터 배열
  dataTypeMonth: "avgTa", // 월별 탭에서 선택된 데이터 유형
  dataTypeYear: "avgTa", // 연도별 탭에서 선택된 데이터 유형
  dateValueMonth: dayjs().subtract(2, "day").date(1).format("YYYYMM01"), // 월별 탭 날짜값 상태
  dateValueYear: dayjs().subtract(2, "day").date(1).format("YYYY0101"), // 연도별 탭 날짜값 상태
  regionValueMonth: "", // 월별 탭 지역값 상태
  regionValueYear: "", // 연도별 탭 지역값 상태
  dataLabelMonth: false, // 월별 탭 데이터 레이블 표시 ON/OFF 여부
  dataLabelYear: false, // 연도별 탭 데이터 레이블 표시 ON/OFF 여부
};

// 액션 설정
const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    // 월별 데이터 추가
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
    // 연도별 데이터 추가
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
    // 월별 데이터 제거
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
    // 연도별 데이터 제거
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
    // 월별 데이터 유형 변경
    setDataTypeMonth(state, action: PayloadAction<string>) {
      state.dataTypeMonth = action.payload;
    },
    // 연도별 데이터 유형 변경
    setDataTypeYear(state, action: PayloadAction<string>) {
      state.dataTypeYear = action.payload;
    },
    // 월별 탭 날짜값 설정
    setDateValueMonth(state, action: PayloadAction<string>) {
      state.dateValueMonth = action.payload;
    },
    // 연도별 탭 날짜값 설정
    setDateValueYear(state, action: PayloadAction<string>) {
      state.dateValueYear = action.payload;
    },
    // 월별 탭 지역값 설정
    setRegionValueMonth(state, action: PayloadAction<string>) {
      state.regionValueMonth = action.payload;
    },
    // 연도별 탭 지역값 설정
    setRegionValueYear(state, action: PayloadAction<string>) {
      state.regionValueYear = action.payload;
    },
    // 월별 탭 데이터 레이블 표시 ON/OFF
    setDataLabelMonth(state) {
      state.dataLabelMonth = !state.dataLabelMonth;
    },
    // 연도별 탭 데이터 레이블 표시 ON/OFF
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
  setDataTypeMonth,
  setDataTypeYear,
  setDateValueMonth,
  setDateValueYear,
  setRegionValueMonth,
  setRegionValueYear,
  setDataLabelMonth,
  setDataLabelYear,
} = chartDataSlice.actions;

// Redux 스토어 설정
const store = configureStore({
  reducer: {
    chartData: chartDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
