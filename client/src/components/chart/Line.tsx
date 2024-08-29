/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useRef, useEffect } from "react";
import Chart from "react-apexcharts";

import DataLabelToggle from "components/selector/DataLabelToggle";
import { getChartOptions } from "constants/chartOptionsLine";
import { getDataSeries } from "utils/generateData";
import { SelectedData } from "types/data";

import { useMediaQuery, Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

const dataTypeLabel: { [key: string]: string } = {
  avgTa: "평균 기온 ",
  maxTa: "최고 기온 ",
  minTa: "최저 기온 ",
  avgRhm: "평균 습도 ",
  sumRn: "강수량 ",
  avgWs: "평균 풍속 ",
};
const dataTypeUnit: { [key: string]: string } = {
  avgTa: "(°C)",
  maxTa: "(°C)",
  minTa: "(°C)",
  avgRhm: "(%)",
  sumRn: "(mm)",
  avgWs: "(m/s)",
};

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
  const is1160Up = useMediaQuery("(min-width:1160px)");
  const is775Up = useMediaQuery("(min-width:775px)");
  const tickAmount = useMemo(() => {
    if (is1160Up) return 12;
    else if (is775Up) return 8;
    else return 4;
  }, [is1160Up, is775Up]);

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

  // 라이브러리 문제 때문에 가로 길이 수동 설정
  const paperRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number | string>("100%");

  useEffect(() => {
    const updateChartWidth = () => {
      if (paperRef.current) {
        setChartWidth(paperRef.current.offsetWidth - 15);
      }
    };
    const observer = new ResizeObserver(() => {
      updateChartWidth();
    });
    const paperElement = paperRef.current;
    if (paperElement) {
      observer.observe(paperElement);
    }
    updateChartWidth();
    return () => {
      if (paperElement) {
        observer.unobserve(paperElement);
      }
    };
  }, []);

  return (
    <Paper ref={paperRef} sx={{ margin: 2 }} elevation={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingTop: 2, paddingX: 2 }}
      >
        <Typography variant="h5">
          {dataTypeLabel[dataType] || dataType}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontSize: "15px" }}
          >
            {dataTypeUnit[dataType] || dataType}
          </Typography>
        </Typography>
        <DataLabelToggle dataLabel={dataLabel} setDataLabel={setDataLabel} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Chart
          type="line"
          options={chartOptions}
          series={chartData}
          width={chartWidth}
          height={300}
        />
      </Box>
    </Paper>
  );
}
