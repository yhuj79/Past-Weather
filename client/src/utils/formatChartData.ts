interface Data {
  tm: string;
  avgTa: string;
}

export const fillMonthGaps = (data: { x: string; y: number | null }[]) => {
  const filledData = [];
  for (let i = 1; i <= 31; i++) {
    const dayStr = String(i).padStart(2, "0");
    const foundItem = data.find((item) => item.x === dayStr);
    if (foundItem) {
      filledData.push(foundItem);
    } else {
      filledData.push({ x: dayStr, y: null });
    }
  }
  return filledData;
};

export const fillYearGaps = (
  data: { x: string; y: number | null }[],
  year: number
) => {
  const filledData = [];
  const currentMonth = new Date().getMonth() + 1;

  for (let i = 1; i <= 12; i++) {
    const monthStr = String(i).padStart(2, "0");
    const foundItem = data.find((item) => item.x === monthStr);

    if (foundItem) {
      filledData.push(foundItem);
    } else {
      if (year === new Date().getFullYear() && i > currentMonth) {
        filledData.push({ x: monthStr, y: null });
      } else {
        filledData.push({ x: monthStr, y: null });
      }
    }
  }

  return filledData;
};

export const formatMonthData = (data: Data[]) => {
  const formatData = data.map((item) => {
    const date = new Date(item.tm);
    const day = String(date.getDate()).padStart(2, "0");
    return {
      x: day,
      y: item.avgTa !== "" ? parseFloat(item.avgTa) : null,
    };
  });

  return fillMonthGaps(formatData);
};

export const formatYearData = (data: Data[], year: number) => {
  const monthlyData: { [key: string]: number[] } = {};

  data.forEach((item) => {
    if (item.avgTa !== "") {
      const date = new Date(item.tm);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const temp = parseFloat(item.avgTa);

      if (!monthlyData[month]) {
        monthlyData[month] = [];
      }
      monthlyData[month].push(temp);
    }
  });

  const formatData = Object.entries(monthlyData).map(([month, temps]) => {
    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
    return {
      x: month,
      y: parseFloat(avgTemp.toFixed(1)),
    };
  });

  return fillYearGaps(formatData, year);
};
