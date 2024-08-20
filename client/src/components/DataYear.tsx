import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, addYear, removeYear } from "store";

import InputDate from "components/InputDate";
import InputRegion from "components/InputRegion";
import { chartOptions } from "constants/chartOptions";
import regionData from "constants/regionData.json";
import { formatYearData } from "utils/formatChartData";

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

function DataYear() {
  const dispatch: AppDispatch = useDispatch();
  const selectedYear = useSelector(
    (state: RootState) => state.chartData.selectedYear
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs("20240101"));
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const handleAdd = () => {
    dispatch(addYear({ startDate, endDate, region }));
  };

  const handleRemove = (startDate: string, endDate: string, region: string) => {
    dispatch(removeYear({ startDate, endDate, region }));
  };

  useEffect(() => {
    if (dateValue) {
      setStartDate(dateValue.startOf("year").format("YYYYMMDD"));
      const today = dayjs();

      if (dateValue.isSame(today, "year")) {
        setEndDate(today.subtract(1, "day").format("YYYYMMDD"));
      } else {
        setEndDate(dateValue.endOf("year").format("YYYYMMDD"));
      }
    }
  }, [dateValue]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear.length === 0) return;
      setLoading(true);

      const newChartData: any[] = [];

      for (const { startDate, endDate, region } of selectedYear) {
        try {
          const res = await axios.get(
            `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDate}&endDt=${endDate}&stnIds=${region}`
          );
          const items: Data[] = res.data.response.body.items.item;
          const year = dayjs(startDate).year();

          newChartData.push({
            name: `${dayjs(startDate).format("YYYY년")} ${
              regionData.find((r) => r.id === region)?.name
            }`,
            data: formatYearData(items, year),
          });
        } catch (error) {
          alert("해당 API가 존재하지 않습니다.");
          dispatch(removeYear({ startDate, endDate, region }));
          console.error("API Error: ", error);
        }
      }

      setChartData(newChartData);
      setLoading(false);
    };

    fetchData();
  }, [selectedYear, dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Year
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <InputDate
          type={"year"}
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
        <InputRegion region={region} setRegion={setRegion} />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <List>
        {selectedYear.map(({ startDate, endDate, region }) => (
          <ListItem key={`${startDate}-${endDate}-${region}`}>
            {dayjs(startDate).format("YYYY년")}{" "}
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
          {selectedYear.length > 0 && (
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

export default DataYear;
