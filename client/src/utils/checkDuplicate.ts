import { SelectedData } from "types/data";

// 데이터 추가 전 중복 체크 함수
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
