/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import Chart from "react-apexcharts";

import DataLabelToggle from "components/selector/DataLabelToggle";
import { getChartOptions } from "constants/chartOptionsLine";
import { getDataSeries } from "utils/generateData";
import { SelectedData } from "types/data";

import { useTheme, useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Line({
  tab,
  selectedData,
  dataType,
  dataLabel,
  setDataLabel,
}: {
  tab: string;
  selectedData: SelectedData[];
  dataType: string;
  dataLabel: boolean;
  setDataLabel: () => void;
}) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const tickAmount = useMemo(() => {
    if (isLargeScreen) return 12;
    if (isMediumScreen) return 8;
    if (isSmallScreen) return 6;
    return 4;
  }, [isLargeScreen, isMediumScreen, isSmallScreen]);

  const chartOptions = useMemo(
    () =>
      getChartOptions(
        tab === "month" ? "month" : "year",
        dataLabel,
        tickAmount
      ),
    [dataLabel, tickAmount]
  );

  const chartData = useMemo(
    () =>
      getDataSeries(
        selectedData,
        dataType,
        tab === "month" ? "YYYY년 MM월" : "YYYY년"
      ),
    [selectedData, dataType]
  );

  return (
    <Paper sx={{ margin: 2, paddingX: 4, paddingTop: 2 }} elevation={3}>
      <DataLabelToggle dataLabel={dataLabel} setDataLabel={setDataLabel} />
      <Chart
        options={chartOptions}
        series={chartData}
        type="line"
        height={300}
      />
    </Paper>
  );
}
