/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useRef, useEffect } from "react";
import Chart from "react-apexcharts";

import DataLabelToggle from "components/selector/DataLabelToggle";
import { getChartOptions } from "constants/chartOptionsLine";
import { dataTypeLabel, dataTypeUnit } from "constants/dataType";
import { getDataSeries } from "utils/generateData";
import { SelectedData } from "types/data";

import { useMediaQuery, Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

// 라인 차트 컴포넌트
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
  // 화면 크기에 따라 x축 틱 개수 조정
  const is1160Up = useMediaQuery("(min-width:1160px)");
  const is775Up = useMediaQuery("(min-width:775px)");
  const tickAmount = useMemo(() => {
    if (is1160Up) return 12;
    else if (is775Up) return 8;
    else return 4;
  }, [is1160Up, is775Up]);

  // 데이터 레이블 표시 ON/OFF, 틱 개수 변화에 따라 차트 옵션이 재설정
  const chartOptions = useMemo(
    () =>
      getChartOptions(
        tab === "month" ? "month" : "year",
        dataLabel,
        tickAmount
      ),
    [dataLabel, tickAmount]
  );

  // 선택된 데이터, 그 유형에 따라 차트 데이터 재설정
  const chartData = useMemo(
    () =>
      getDataSeries(
        selectedData,
        dataType,
        tab === "month" ? "YYYY년 MM월" : "YYYY년"
      ),
    [selectedData, dataType]
  );

  // 라이브러리 문제 때문에 가로 길이 수동적으로 설정
  const paperRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number | string>("100%");
  // 컴포넌트가 렌더링될 때와 화면 크기 변화가 감지될 때 차트의 가로 길이를 업데이트
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
      // 요소의 크기 변화를 감시
      observer.observe(paperElement);
    }
    updateChartWidth();
    return () => {
      if (paperElement) {
        // 컴포넌트가 언마운트될 때 감시 해제
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
