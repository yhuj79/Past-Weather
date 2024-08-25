import { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  AppDispatch,
  addMonth,
  removeMonth,
  setDateValueMonth,
  setRegionValueMonth,
  setDataLabelMonth,
} from "store";

import LoaderBackdrop from "components/LoaderBackdrop";
import FlexBox from "components/FlexBox";
import EmptyContainer from "components/EmptyContainer";
import DataTypeSelector from "components/DataTypeSelector";
import DataChips from "components/DataChips";
import DataLabelToggle from "components/DataLabelToggle";
import InputDate from "components/InputDate";
import InputRegion from "components/InputRegion";
import { getChartOptions } from "constants/chartOptions";
import { fetchData } from "utils/fetchData";
import { formatMonthData, getDataSeries } from "utils/generateData";
import { checkDuplicate } from "utils/checkDuplicate";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function ChartMonth() {
  const dispatch: AppDispatch = useDispatch();
  const {
    selectedMonth,
    dateValueMonth,
    dataTypeMonth: dataType,
    dataLabelMonth: dataLabel,
    regionValueMonth: region,
  } = useSelector((state: RootState) => state.chartData);

  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const chartOptions = useMemo(
    () => getChartOptions("month", dataLabel),
    [dataLabel]
  );

  const chartData = useMemo(
    () => getDataSeries(selectedMonth, dataType, "YYYY년 MM월"),
    [selectedMonth, dataType]
  );

  const dateValue = dayjs(dateValueMonth);
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

  const handleAdd = async () => {
    if (checkDuplicate(selectedMonth, startDate, endDate, region)) {
      console.log("중복된 데이터입니다.");
      return;
    }
    setLoading(true);

    try {
      const items = await fetchData(startDate, endDate, region);
      if (items) {
        const formattedData = formatMonthData(items);
        dispatch(
          addMonth({
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
    dispatch(removeMonth({ startDate, endDate, region }));
  };

  return (
    <>
      {loading && <LoaderBackdrop loading={loading} />}
      <FlexBox>
        <InputDate
          type={"month"}
          dateValue={dateValue}
          setDateValue={(v) =>
            dispatch(setDateValueMonth(dayjs(v).format("YYYYMM01")))
          }
        />
        <InputRegion
          region={region}
          setRegion={(v) => dispatch(setRegionValueMonth(v))}
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
        <Button variant="contained" onClick={() => console.log(selectedMonth)}>
          CONSOLE
        </Button>
      </FlexBox>
      {selectedMonth.length > 0 ? (
        <>
          <DataTypeSelector type={"month"} dataType={dataType} />
          <DataChips
            type={"month"}
            selectedData={selectedMonth}
            handleRemove={handleRemove}
          />
          <Paper sx={{ margin: 2, paddingX: 4, paddingTop: 2 }} elevation={3}>
            <DataLabelToggle
              dataLabel={dataLabel}
              setDataLabel={() => dispatch(setDataLabelMonth())}
            />
            <Chart
              options={chartOptions}
              series={chartData}
              type="line"
              height={300}
            />
          </Paper>
        </>
      ) : (
        <EmptyContainer />
      )}
    </>
  );
}
