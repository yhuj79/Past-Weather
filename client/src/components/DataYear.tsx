import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// 인터페이스 정의
interface Data {
  tm: string; // 날짜 (YYYY-MM-DD)
  avgTa: string; // 평균 기온
}

// 데이터 가공 함수 - 월별 평균으로 변환
const formatMonthlyAverage = (data: Data[]) => {
  const monthlyData: { [key: string]: { totalTemp: number; count: number } } =
    {};

  // 데이터를 월별로 그룹화하고 평균 계산
  data.forEach((item) => {
    const month = new Date(item.tm).getMonth() + 1; // 월 추출 (0 ~ 11 이므로 +1)
    const avgTemp = parseFloat(item.avgTa);

    if (!monthlyData[month]) {
      monthlyData[month] = { totalTemp: 0, count: 0 };
    }

    monthlyData[month].totalTemp += avgTemp;
    monthlyData[month].count += 1;
  });

  // 월별 평균을 계산하여 데이터 배열로 변환
  const formattedData = Object.keys(monthlyData).map((month) => {
    const { totalTemp, count } = monthlyData[month];
    return {
      x: month, // x축에 표시할 월 (1월, 2월, ...)
      y: parseFloat((totalTemp / count).toFixed(2)), // 평균 기온
    };
  });

  return formattedData;
};

function DataYear() {
  const [chartData, setChartData] = useState<any[]>([]); // 그래프에 사용할 데이터
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDt: string = "20220101";
        const endDt: string = "20221231";
        const res = await axios.get(
          `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDt}&endDt=${endDt}&stnIds=108`
        );
        const items: Data[] = res.data.response.body.items.item;
        const formattedData = formatMonthlyAverage(items); // 데이터 가공 (월별 평균)
        setChartData([{ name: "Average Temp", data: formattedData }]); // ApexCharts에 맞는 형식으로 설정
        setLoading(false); // 로딩 상태 해제
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ApexCharts 옵션 정의
  const chartOptions: ApexOptions = {
    chart: {
      type: "line", // 차트 타입
      height: 500,
    },
    stroke: {
      curve: "smooth", // 부드러운 곡선
    },
    xaxis: {
      type: "category", // x축은 카테고리 타입 (월 표시)
      title: {
        text: "Month", // x축 제목
      },
      categories: Array.from({ length: 12 }, (_, i) => `${i + 1}월`), // 1월 ~ 12월
    },
    yaxis: {
      title: {
        text: "Average Temperature (°C)", // y축 제목
      },
    },
    colors: ["#32CD32"], // 라인 색상
    tooltip: {
      x: {
        formatter: (val) => `${val}월`,
      },
    },
    legend: {
      position: "top", // 범례 위치
    },
  };

  return (
    <div>
      {!loading ? (
        <div>
          <Chart
            options={chartOptions} // 차트 옵션
            series={chartData} // 차트 데이터
            type="line" // 차트 타입
            height={500}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DataYear;
