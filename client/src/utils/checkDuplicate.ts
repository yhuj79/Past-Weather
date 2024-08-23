import { SelectedData } from "types/data";

export const checkDuplicate = (
  data: SelectedData[],
  startDate: string,
  endDate: string,
  region: string
) => {
  const isDuplicate = data.some(
    (m) =>
      m.startDate === startDate && m.endDate === endDate && m.region === region
  );

  return isDuplicate;
};
