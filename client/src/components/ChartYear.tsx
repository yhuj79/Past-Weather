import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  AppDispatch,
  addYear,
  removeYear,
  setDateValueYear,
  setRegionValueYear,
  setDataLabelYear,
} from "store";

import LoaderBackdrop from "components/LoaderBackdrop";
import FlexBox from "components/FlexBox";
import DataTypeSelector from "components/DataTypeSelector";
import DataChips from "components/DataChips";
import DataLabelToggle from "components/DataLabelToggle";
import InputDate from "components/InputDate";
import InputRegion from "components/InputRegion";
import { getChartOptions } from "constants/chartOptions";
import { formatYearData, getDataSeries } from "utils/generateData";
import { checkDuplicate } from "utils/checkDuplicate";
import { VanillaData } from "types/data";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function ChartYear() {
  const dispatch: AppDispatch = useDispatch();
  const {
    selectedYear,
    dateValueYear,
    dataTypeYear: dataType,
    dataLabelYear: dataLabel,
    regionValueYear: region,
  } = useSelector((state: RootState) => state.chartData);

  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const chartOptions = useMemo(
    () => getChartOptions("year", dataLabel),
    [dataLabel]
  );

  const dateValue = dayjs(dateValueYear);
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

  const handleAdd = async () => {
    if (checkDuplicate(selectedYear, startDate, endDate, region)) {
      console.log("중복된 데이터입니다.");
      return;
    }
    setLoading(true);

    const fetchData = async (retryCount = 0): Promise<VanillaData[] | null> => {
      try {
        const res = await axios.get(
          `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDate}&endDt=${endDate}&stnIds=${region}`,
          { timeout: 3000 } // 3초 타임아웃 설정
        );
        const items: VanillaData[] = res.data.response.body.items?.item;
        return items;
      } catch (err) {
        if (retryCount < 30) {
          console.log(`요청 실패, 재시도 중... (${retryCount + 1}/30)`);
          return fetchData(retryCount + 1); // 재귀 호출로 재시도
        } else {
          let message;
          if (err instanceof Error) message = err.message;
          else message = String(err);
          console.log(message);
          return null;
        }
      }
    };

    try {
      const items = await fetchData();
      if (items) {
        const year = dayjs(startDate).year();
        const formattedData = formatYearData(items, year);
        dispatch(
          addYear({
            startDate,
            endDate,
            region,
            data: formattedData,
          })
        );
      } else {
        console.log("데이터를 가져오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (startDate: string, endDate: string, region: string) => {
    dispatch(removeYear({ startDate, endDate, region }));
  };

  return (
    <>
      {loading && <LoaderBackdrop loading={loading} />}
      <FlexBox>
        <InputDate
          type={"year"}
          dateValue={dateValue}
          setDateValue={(newValue) =>
            dispatch(setDateValueYear(dayjs(newValue).format("YYYY0101")))
          }
        />
        <InputRegion
          region={region}
          setRegion={(newValue) => dispatch(setRegionValueYear(newValue))}
        />
        {region !== "" ? (
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        ) : (
          <Button variant="contained" disabled>
            Add
          </Button>
        )}
      </FlexBox>
      <DataTypeSelector type={"year"} dataType={dataType} />
      <DataChips
        type={"year"}
        selectedData={selectedYear}
        handleRemove={handleRemove}
      />
      <Paper sx={{ margin: 2, paddingX: 4, paddingTop: 2 }} elevation={3}>
        <DataLabelToggle
          dataLabel={dataLabel}
          setDataLabel={() => dispatch(setDataLabelYear())}
        />
        <Chart
          options={chartOptions}
          series={getDataSeries(selectedYear, dataType, "YYYY년")}
          type="line"
          height={300}
        />
      </Paper>
    </>
  );
}
