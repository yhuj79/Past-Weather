import axios from "axios";

import { VanillaData } from "types/data";

// 차트 데이터를 가져오는 함수
export const fetchChartData = async (
  startDate: string,
  endDate: string,
  region: string,
  retryCount = 0 // 재시도 횟수 (기본값: 0)
): Promise<VanillaData[] | null> => {
  try {
    const res = await axios.get(
      `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_CHART_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDate}&endDt=${endDate}&stnIds=${region}`,
      { timeout: 2000 } // 요청 타임아웃: 2초
    );
    const items: VanillaData[] = res.data.response.body.items?.item;
    return items;
  } catch (err) {
    // 요청 실패 시 최대 5번까지 재시도
    if (retryCount < 5) {
      console.log(`Retry (${retryCount + 1}/5)`);
      return fetchChartData(startDate, endDate, region, retryCount + 1);
    } else {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      console.log(message);
      return null;
    }
  }
};

// 주간 예보 데이터를 가져오는 함수
export const fetchForecastData = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&lang=kr&appid=${process.env.REACT_APP_FORECAST_API_KEY}`
    );
    return response.data.daily.slice(0, 7).map((day: any) => {
      const dateObj = new Date(day.dt * 1000); // 날짜 객체 변환
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      return {
        date: `${month}.${date < 10 ? "0" : ""}${date}.`, // "M.DD." 형식
        day: dateObj.toLocaleDateString("ko-KR", {
          weekday: "long",
        })[0], // 요일의 첫 글자
        icon: day.weather[0].icon, // OpenWeatherMap에서 제공하는 날씨 아이콘
        minTemp: day.temp.min, // 최저 기온
        maxTemp: day.temp.max, // 최고 기온
      };
    });
  } catch (error) {
    console.error("Failed to fetch weather data", error);
    return [];
  }
};
