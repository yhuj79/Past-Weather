import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";

// 인터페이스 정의
interface Data {
  tm: string;
  avgTa: string;
}

// 데이터 가공 함수
const formatChartData = (data: Data[], id: string, color: string) => {
  return {
    id, // 그래프 라인의 id (7월, 8월 구분)
    color, // 라인의 색상
    data: data.map((item) => {
      const date = new Date(item.tm);
      const day = String(date.getDate()).padStart(2, "0");
      return {
        x: day, // x축에 표시할 일 (1일, 2일, ...)
        y: parseFloat(item.avgTa), // 평균 기온
      };
    }),
  };
};

function DataMonth() {
  const [chartData, setChartData] = useState<any[]>([]); // 그래프에 사용할 데이터
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 7월 데이터
        const julyStartDt: string = "20220701";
        const julyEndDt: string = "20220731";
        const julyRes = await axios.get(
          `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${julyStartDt}&endDt=${julyEndDt}&stnIds=108`
        );
        const julyItems: Data[] = julyRes.data.response.body.items.item;
        
        // 8월 데이터
        const augustStartDt: string = "20230701";
        const augustEndDt: string = "20230731";
        const augustRes = await axios.get(
          `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${augustStartDt}&endDt=${augustEndDt}&stnIds=108`
        );
        const augustItems: Data[] = augustRes.data.response.body.items.item;

        // 데이터 가공
        const julyData = formatChartData(julyItems, "2022 July", "hsl(220, 70%, 50%)"); // 7월 데이터 (파란색 라인)
        const augustData = formatChartData(augustItems, "2023 July", "hsl(70, 70%, 50%)"); // 8월 데이터 (녹색 라인)

        // 두 개의 데이터 세트를 차트 데이터에 설정
        setChartData([julyData, augustData]);
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
            enableArea={false}
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

export default DataMonth;
