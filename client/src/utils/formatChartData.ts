interface Data {
  tm: string;
  avgTa: string;
}

export const fillMonthGaps = (data: { x: string; y: number }[]) => {
  const filledData = [];
  for (let day = 1; day <= 31; day++) {
    const dayStr = String(day).padStart(2, "0");
    const foundItem = data.find((item) => item.x === dayStr);
    if (foundItem) {
      filledData.push(foundItem);
    } else {
      filledData.push({ x: dayStr, y: null });
    }
  }
  return filledData;
};

export const fillYearGaps = (data: { x: string; y: number }[]) => {
  const filledData = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = String(month + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");

      const foundItem = data.find((item) => item.x === `${monthStr}-${dayStr}`);
      const currentDateStr = `${currentYear}-${monthStr}-${dayStr}`;

      if (foundItem) {
        filledData.push(foundItem);
      } else {
        if (new Date(currentDateStr) > currentDate) {
          filledData.push({ x: `${monthStr}-${dayStr}`, y: null });
        }
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
      y: parseFloat(item.avgTa),
    };
  });

  return fillMonthGaps(formatData);
};

export const formatYearData = (data: Data[]) => {
  const formatData = data.map((item) => {
    const date = new Date(item.tm);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return {
      x: `${month}-${day}`,
      y: parseFloat(item.avgTa),
    };
  });

  return fillYearGaps(formatData);
};
