import Chart from "react-apexcharts";

import { chartOptions } from "constants/chartOptionsDonutRhm";
import { SelectedData } from "types/data";

import { Paper } from "@mui/material";

// 평균 습도 도넛 차트 컴포넌트
export default function DonutRhm({
  selectedData,
}: {
  selectedData: SelectedData[];
}) {
  // 평균 습도의 구간을 나누어 도넛 차트용 데이터로 가공
  const calculateAvgRhmDist = (selectedData: SelectedData[]): number[] => {
    const count = new Array<number>(10).fill(0);
    const ranges: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    selectedData.forEach((v) => {
      v.data.forEach((m) => {
        const avgRhm = m.avgRhm;
        if (avgRhm !== null) {
          const index = ranges.findIndex((range) => avgRhm <= range);
          const countIndex = index === -1 ? ranges.length : index;
          count[countIndex]++;
        }
      });
    });
    return count;
  };

  const chartData = calculateAvgRhmDist(selectedData);

  return (
    <Paper sx={{ width: "100%" }} elevation={3}>
      <Chart
        type="donut"
        options={chartOptions}
        series={chartData}
        height={300}
      />
    </Paper>
  );
}
