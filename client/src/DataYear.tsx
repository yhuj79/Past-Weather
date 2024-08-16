import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";

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
      y: (totalTemp / count).toFixed(2), // 평균 기온
    };
  });

  return [
    {
      id: "avgTa", // 그래프 라인의 id
      color: "hsl(70, 70%, 50%)", // 라인의 색상
      data: formattedData, // 월별 평균 기온 데이터
    },
  ];
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
        setChartData(formattedData); // 차트 데이터 설정
        setLoading(false); // 로딩 상태 해제
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <div style={{ width: "1000px", height: "500px" }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            curve="cardinal" // basis, cardinal, linear, natural
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Date",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Average Temperature (°C)",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enablePoints={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableArea={true}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DataYear;
