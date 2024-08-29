import { useEffect, useState } from "react";
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
import { formatMonthData } from "utils/generateData";
import { checkDuplicate } from "utils/checkDuplicate";

import { Alert, useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

export default function Month({ tab }: { tab: string }) {
  const is775Up = useMediaQuery("(min-width:775px)");
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
  const [alertDuplicate, setAlertDuplicate] = useState<boolean>(false);
  const [alertFailed, setAlertFailed] = useState<boolean>(false);

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
      setAlertDuplicate(true);
      return;
    }
    setLoading(true);
    setAlertDuplicate(false);
    setAlertFailed(false);

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
        setAlertFailed(true);
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
      {alertDuplicate && (
        <Alert severity="warning" onClose={() => setAlertDuplicate(false)}>
          중복된 데이터입니다.
        </Alert>
      )}
      {alertFailed && (
        <Alert severity="error" onClose={() => setAlertFailed(false)}>
          데이터 로딩에 실패했습니다.
        </Alert>
      )}
      <Box
        sx={{
          display: is775Up ? "flex" : "block",
          alignItems: "center",
          margin: 2,
          gap: 2,
          "& > *:not(:last-child)": {
            width: is775Up ? null : "100%",
            marginBottom: is775Up ? 0 : 2,
          },
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <InputDate
            tab={tab}
            dateValue={dateValue}
            setDateValue={(v) =>
              dispatch(setDateValueMonth(dayjs(v).format("YYYYMM01")))
            }
          />
          <InputRegion
            region={region}
            setRegion={(v) => dispatch(setRegionValueMonth(v))}
          />
        </Box>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={handleAdd}
          disabled={!(region !== "" && dateValue.isValid())}
        >
          선택
        </Button>
        <DataTypeSelector tab={tab} dataType={dataType} />
      </Box>
      {selectedMonth.length > 0 ? (
        <>
          <DataChips
            tab={tab}
            selectedData={selectedMonth}
            handleRemove={handleRemove}
          />
          <Line
            tab={tab}
            selectedData={selectedMonth}
            dataType={dataType}
            dataLabel={dataLabel}
            setDataLabel={() => dispatch(setDataLabelMonth())}
          />
          <Box
            sx={{
              display: is775Up ? "flex" : "block",
              alignItems: "center",
              margin: 2,
              gap: 2,
            }}
          >
            <DonutTa selectedData={selectedMonth} />
            <DonutRhm selectedData={selectedMonth} />
          </Box>
        </>
      ) : (
        <EmptyContainer />
      )}
    </>
  );
}
