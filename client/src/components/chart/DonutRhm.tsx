import Chart from "react-apexcharts";

import { chartOptions } from "constants/chartOptionsDonutRhm";
import { SelectedData } from "types/data";

import { Paper } from "@mui/material";

export default function DonutRhm({
  selectedData,
}: {
  selectedData: SelectedData[];
}) {
  const calculateAvgRhmDist = (selectedData: SelectedData[]): number[] => {
    const count = new Array<number>(10).fill(0);
    const ranges = [10, 20, 30, 40, 50, 60, 70, 80, 90];

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

  const series = calculateAvgRhmDist(selectedData);

  return (
    <Paper sx={{ width: "100%", marginBottom: 2 }} elevation={3}>
      <Chart options={chartOptions} series={series} type="donut" height={300} />
    </Paper>
  );
}