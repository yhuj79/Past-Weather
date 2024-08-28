import { useEffect, useState } from "react";
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

import LoaderBackdrop from "components/common/LoaderBackdrop";
import EmptyContainer from "components/common/EmptyContainer";
import DataTypeSelector from "components/selector/DataTypeSelector";
import DataChips from "components/selector/DataChips";
import InputDate from "components/selector/InputDate";
import InputRegion from "components/selector/InputRegion";
import Line from "components/chart/Line";
import DonutTa from "components/chart/DonutTa";
import DonutRhm from "components/chart/DonutRhm";
import { fetchData } from "utils/fetchData";
import { formatYearData } from "utils/generateData";
import { checkDuplicate } from "utils/checkDuplicate";

import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

export default function Year({ tab }: { tab: string }) {
  const is720Up = useMediaQuery("(min-width:720px)");
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

    try {
      const items = await fetchData(startDate, endDate, region);
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
      <Box
        sx={{
          display: is720Up ? "flex" : "block",
          alignItems: "center",
          margin: 2,
          gap: 2,
          "& > *:not(:last-child)": {
            width: is720Up ? null : "100%",
            marginBottom: is720Up ? 0 : 2,
          },
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <InputDate
            tab={tab}
            dateValue={dateValue}
            setDateValue={(v) =>
              dispatch(setDateValueYear(dayjs(v).format("YYYY0101")))
            }
          />
          <InputRegion
            region={region}
            setRegion={(v) => dispatch(setRegionValueYear(v))}
          />
        </Box>
        {region !== "" && dateValue.isValid() ? (
          <Button variant="contained" onClick={handleAdd}>
            선택
          </Button>
        ) : (
          <Button variant="contained" disabled>
            선택
          </Button>
        )}
        <DataTypeSelector tab={tab} dataType={dataType} />
      </Box>
      {selectedYear.length > 0 ? (
        <>
          <DataChips
            tab={tab}
            selectedData={selectedYear}
            handleRemove={handleRemove}
          />
          <Line
            tab={tab}
            selectedData={selectedYear}
            dataType={dataType}
            dataLabel={dataLabel}
            setDataLabel={() => dispatch(setDataLabelYear())}
          />
          <Box
            sx={{
              display: is720Up ? "flex" : "block",
              alignItems: "center",
              margin: 2,
              gap: 2,
            }}
          >
            <DonutTa selectedData={selectedYear} />
            <DonutRhm selectedData={selectedYear} />
          </Box>
        </>
      ) : (
        <EmptyContainer />
      )}
    </>
  );
}
