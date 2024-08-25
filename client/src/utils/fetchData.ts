import axios from "axios";

import { VanillaData } from "types/data";

export const fetchData = async (
  startDate: string,
  endDate: string,
  region: string,
  retryCount = 0
): Promise<VanillaData[] | null> => {
  try {
    const res = await axios.get(
      `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDate}&endDt=${endDate}&stnIds=${region}`,
      { timeout: 3000 }
    );
    const items: VanillaData[] = res.data.response.body.items?.item;
    return items;
  } catch (err) {
    if (retryCount < 30) {
      console.log(`Retry (${retryCount + 1}/30)`);
      return fetchData(startDate, endDate, region, retryCount + 1);
    } else {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      console.log(message);
      return null;
    }
  }
};
