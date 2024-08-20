import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, addMonth, removeMonth } from "store";

import InputDate from "components/InputDate";
import InputRegion from "components/InputRegion";
import { chartOptions } from "constants/chartOptions";
import regionData from "constants/regionData.json";
import { formatMonthData } from "utils/formatChartData";

import Button from "@mui/material/Button";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";

interface Data {
  tm: string;
  avgTa: string;
}

function DataMonth() {
  const dispatch: AppDispatch = useDispatch();
  const selectedMonth = useSelector(
    (state: RootState) => state.chartData.selectedMonth
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs("20240801"));
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const handleAdd = () => {
    dispatch(addMonth({ startDate, endDate, region }));
  };

  const handleRemove = (startDate: string, endDate: string, region: string) => {
    dispatch(removeMonth({ startDate, endDate, region }));
  };

  useEffect(() => {
    if (dateValue) {
      setStartDate(dateValue.format("YYYYMMDD"));
      const today = dayjs();

      if (dateValue.isSame(today, "month")) {
        setEndDate(today.subtract(1, "day").format("YYYYMMDD"));
      } else {
        setEndDate(dateValue.endOf("month").format("YYYYMMDD"));
      }
    }
  }, [dateValue]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMonth.length === 0) return;
      setLoading(true);

      const newChartData: any[] = [];

      for (const { startDate, endDate, region } of selectedMonth) {
        try {
          const res = await axios.get(
            `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDate}&endDt=${endDate}&stnIds=${region}`
          );
          const items: Data[] = res.data.response.body.items.item;

          newChartData.push({
            name: `${dayjs(startDate).format("YYYY년 MM월")} ${
              regionData.find((r) => r.id === region)?.name
            }`,
            data: formatMonthData(items),
          });
        } catch (error) {
          alert("해당 API가 존재하지 않습니다.");
          dispatch(removeMonth({ startDate, endDate, region }));
          console.error("API Error: ", error);
        }
      }
      setChartData(newChartData);
      setLoading(false);
    };

    fetchData();
  }, [selectedMonth, dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Month
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <InputDate
          type={"month"}
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
        <InputRegion region={region} setRegion={setRegion} />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <List>
        {selectedMonth.map(({ startDate, endDate, region }) => (
          <ListItem key={`${startDate}-${endDate}-${region}`}>
            {dayjs(startDate).format("YYYY년 MM월")}{" "}
            {regionData.find((r) => r.id === region)?.name}
            <Button
              variant="contained"
              onClick={() => handleRemove(startDate, endDate, region)}
              sx={{ ml: 2 }}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      {!loading ? (
        <Box>
          {selectedMonth.length > 0 && (
            <Chart
              options={chartOptions}
              series={chartData}
              type="line"
              height={500}
            />
          )}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default DataMonth;
