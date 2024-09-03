import dayjs from "dayjs";

import regionData from "constants/regionData.json";
import { VanillaData, GenerateData, SelectedData } from "types/data";

// 주어진 데이터의 빈 날짜 값을 채워주는 함수
export const fillDataGaps = (data: GenerateData[], length: number) => {
  const filledData = [];
  for (let i = 1; i <= length; i++) {
    const dateStr = String(i).padStart(2, "0");
    const foundItem = data.find((item) => item.x === dateStr);
    if (foundItem) {
      filledData.push(foundItem);
    } else {
      filledData.push({
        x: dateStr,
        avgTa: null,
        maxTa: null,
        minTa: null,
        avgRhm: null,
        sumRn: null,
        avgWs: null,
      });
    }
  }
  return filledData;
};

// 월별 데이터 가공 함수
export const formatMonthData = (data: VanillaData[]) => {
  const formatData = data.map((item) => {
    const date = new Date(item.tm);
    const x = String(date.getDate()).padStart(2, "0");

    // 월별 데이터의 경우 다른 연산 과정 없이 바로 나열
    return {
      x,
      avgTa: item.avgTa !== "" ? parseFloat(item.avgTa) : null,
      maxTa: item.maxTa !== "" ? parseFloat(item.maxTa) : null,
      minTa: item.minTa !== "" ? parseFloat(item.minTa) : null,
      avgRhm: item.avgRhm !== "" ? parseFloat(item.avgRhm) : null,
      sumRn: item.sumRn !== "" ? parseFloat(item.sumRn) : null,
      avgWs: item.avgWs !== "" ? parseFloat(item.avgWs) : null,
    };
  });

  // 최종적으로 빈 날짜 값 채우기
  return fillDataGaps(formatData, 31);
};

// 연도별 데이터 가공 함수
export const formatYearData = (data: VanillaData[]) => {
  const monthlyData: {
    [key: string]: {
      avgTa: number[];
      maxTa: number[];
      minTa: number[];
      avgRhm: number[];
      sumRn: number[];
      avgWs: number[];
    };
  } = {};

  data.forEach((item) => {
    const date = new Date(item.tm);
    const x = String(date.getMonth() + 1).padStart(2, "0");

    // 월별 데이터 계산 전 객체 초기화
    if (!monthlyData[x]) {
      monthlyData[x] = {
        avgTa: [],
        maxTa: [],
        minTa: [],
        avgRhm: [],
        sumRn: [],
        avgWs: [],
      };
    }
    if (item.avgTa !== "") monthlyData[x].avgTa.push(parseFloat(item.avgTa));
    if (item.maxTa !== "") monthlyData[x].maxTa.push(parseFloat(item.maxTa));
    if (item.minTa !== "") monthlyData[x].minTa.push(parseFloat(item.minTa));
    if (item.avgRhm !== "") monthlyData[x].avgRhm.push(parseFloat(item.avgRhm));
    if (item.sumRn !== "") monthlyData[x].sumRn.push(parseFloat(item.sumRn));
    if (item.avgWs !== "") monthlyData[x].avgWs.push(parseFloat(item.avgWs));
  });

  // 평균 기온(avgTa), 평균 습도(avgRhm)의 경우 데이터의 평균값 계산
  // 최고, 최저 기온(maxTa, minTa)의 경우 각각 데이터의 최고, 최저값 계산
  // 강수량(sumRn)의 경우 데이터 누적값 계산
  const formatData = Object.entries(monthlyData).map(([x, values]) => {
    const avg = (arr: number[]) =>
      parseFloat(
        (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(1)
      );
    const max = (arr: number[]) => Math.max(...arr);
    const min = (arr: number[]) => Math.min(...arr);
    const sum = (arr: number[]) =>
      parseFloat(arr.reduce((sum, val) => sum + val, 0).toFixed(1));

    return {
      x,
      avgTa: values.avgTa.length > 0 ? avg(values.avgTa) : null,
      maxTa: values.maxTa.length > 0 ? max(values.maxTa) : null,
      minTa: values.minTa.length > 0 ? min(values.minTa) : null,
      avgRhm: values.avgRhm.length > 0 ? avg(values.avgRhm) : null,
      sumRn: values.sumRn.length > 0 ? sum(values.sumRn) : null,
      avgWs: values.avgWs.length > 0 ? avg(values.avgWs) : null,
    };
  });

  // 최종적으로 빈 날짜 값 채우기
  return fillDataGaps(formatData, 12);
};

// 주어진 데이터 유형에 따른 값을 반환하는 함수
export const getItemValueByType = (
  item: GenerateData,
  type: string
): number | null => {
  switch (type) {
    case "avgTa":
      return item.avgTa;
    case "maxTa":
      return item.maxTa;
    case "minTa":
      return item.minTa;
    case "avgRhm":
      return item.avgRhm;
    case "sumRn":
      return item.sumRn;
    case "avgWs":
      return item.avgWs;
    default:
      return null;
  }
};

// 최종 라인 차트 데이터 생성 함수
export const getDataSeries = (
  selectedData: SelectedData[],
  dataType: string,
  dateType: string
) => {
  return selectedData.map(({ startDate, region, data }) => ({
    name: `${dayjs(startDate).format(dateType)} ${
      regionData.find((r) => r.id === region)?.name
    }`,
    data: data.map((item) => ({
      x: item.x,
      y: getItemValueByType(item, dataType),
    })),
  }));
};
