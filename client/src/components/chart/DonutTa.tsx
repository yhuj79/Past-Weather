import Chart from "react-apexcharts";

import { chartOptions } from "constants/chartOptionsDonutTa";
import { SelectedData } from "types/data";

import { Paper } from "@mui/material";

// 평균 기온 도넛 차트 컴포넌트
export default function DonutTa({
  selectedData,
}: {
  selectedData: SelectedData[];
}) {
  // 평균 기온의 구간을 나누어 도넛 차트용 데이터로 가공
  const calculateAvgTaDist = (selectedData: SelectedData[]): number[] => {
    const count = new Array<number>(10).fill(0);
    const ranges: number[] = [-10, -5, 0, 5, 10, 15, 20, 25, 30];

    selectedData.forEach((v) => {
      v.data.forEach((m) => {
        const avgTa = m.avgTa;
        if (avgTa !== null) {
          const index = ranges.findIndex((range) => avgTa <= range);
          const countIndex = index === -1 ? ranges.length : index;
          count[countIndex]++;
        }
      });
    });
    return count;
  };

  const chartData = calculateAvgTaDist(selectedData);

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
