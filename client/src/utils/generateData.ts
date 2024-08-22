import dayjs from "dayjs";
import regionData from "constants/regionData.json";
import { VanillaData, GenerateData, SelectedData } from "types/data";

export const fillMonthGaps = (data: GenerateData[]) => {
  const filledData = [];
  for (let i = 1; i <= 31; i++) {
    const dayStr = String(i).padStart(2, "0");
    const foundItem = data.find((item) => item.x === dayStr);
    if (foundItem) {
      filledData.push(foundItem);
    } else {
      filledData.push({
        x: dayStr,
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

export const fillYearGaps = (data: GenerateData[], year: number) => {
  const filledData = [];
  const currentMonth = new Date().getMonth() + 1;

  for (let i = 1; i <= 12; i++) {
    const monthStr = String(i).padStart(2, "0");
    const foundItem = data.find((item) => item.x === monthStr);

    if (foundItem) {
      filledData.push(foundItem);
    } else {
      if (year === new Date().getFullYear() && i > currentMonth) {
        filledData.push({
          x: monthStr,
          avgTa: null,
          maxTa: null,
          minTa: null,
          avgRhm: null,
          sumRn: null,
          avgWs: null,
        });
      } else {
        filledData.push({
          x: monthStr,
          avgTa: null,
          maxTa: null,
          minTa: null,
          avgRhm: null,
          sumRn: null,
          avgWs: null,
        });
      }
    }
  }

  return filledData;
};

export const formatMonthData = (data: VanillaData[]) => {
  const formatData = data.map((item) => {
    const date = new Date(item.tm);
    const x = String(date.getDate()).padStart(2, "0");
    return {
      x,
      avgTa: item.avgTa !== "" ? parseFloat(item.avgTa) : null,
      maxTa: item.maxTa !== "" ? parseFloat(item.maxTa) : null,
      minTa: item.minTa !== "" ? parseFloat(item.minTa) : null,
      avgRhm: item.minTa !== "" ? parseFloat(item.avgRhm) : null,
      sumRn: item.sumRn !== "" ? parseFloat(item.sumRn) : null,
      avgWs: item.avgWs !== "" ? parseFloat(item.avgWs) : null,
    };
  });

  return fillMonthGaps(formatData);
};

export const formatYearData = (data: VanillaData[], year: number) => {
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

  const formatData = Object.entries(monthlyData).map(([x, values]) => {
    const avg = (arr: number[]) =>
      parseFloat(
        (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(1)
      );

    return {
      x,
      avgTa: values.avgTa.length > 0 ? avg(values.avgTa) : null,
      maxTa: values.maxTa.length > 0 ? avg(values.maxTa) : null,
      minTa: values.minTa.length > 0 ? avg(values.minTa) : null,
      avgRhm: values.avgRhm.length > 0 ? avg(values.avgRhm) : null,
      sumRn: values.sumRn.length > 0 ? avg(values.sumRn) : null,
      avgWs: values.avgWs.length > 0 ? avg(values.avgWs) : null,
    };
  });

  return fillYearGaps(formatData, year);
};

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

export const getDataSeries = (
  selectedData: SelectedData[],
  dataType: string
) => {
  return selectedData.map(({ startDate, region, data }) => ({
    name: `${dayjs(startDate).format("YYYY년")} ${
      regionData.find((r) => r.id === region)?.name
    }`,
    data: data.map((item) => ({
      x: item.x,
      y: getItemValueByType(item, dataType),
    })),
  }));
};
