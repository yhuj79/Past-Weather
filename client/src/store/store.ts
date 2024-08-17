import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 차트 데이터와 관련된 slice 정의
interface ChartDataState {
  selectedMonths: { year: string; month: string; region: string }[]; // region 추가
}

const initialState: ChartDataState = {
  selectedMonths: [],
};

const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    addMonth(
      state,
      action: PayloadAction<{ year: string; month: string; region: string }>
    ) {
      state.selectedMonths.push(action.payload);
    },
    removeMonth(
      state,
      action: PayloadAction<{ year: string; month: string; region: string }>
    ) {
      state.selectedMonths = state.selectedMonths.filter(
        (item) =>
          !(
            item.year === action.payload.year &&
            item.month === action.payload.month &&
            item.region === action.payload.region
          )
      );
    },
  },
});

export const { addMonth, removeMonth } = chartDataSlice.actions;

const store = configureStore({
  reducer: {
    chartData: chartDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
