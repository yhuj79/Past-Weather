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
import Forecast from "components/forecast/Forecast";
import { fetchChartData } from "utils/fetchData";
import { formatMonthData } from "utils/generateData";
import { checkDuplicate } from "utils/checkDuplicate";
import { rwdBoxStyle } from "styles/base";

import { Alert, useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

// 월별 탭 컴포넌트
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

  // 선택한 달에 따라 시작일과 종료일 설정 (1일~말일)
  const dateValue = dayjs(dateValueMonth);
  useEffect(() => {
    if (dateValue) {
      setStartDate(dateValue.format("YYYYMMDD"));
      const today = dayjs();

      // 이번 달일 경우 전일을 종료일로 설정
      if (dateValue.isSame(today, "month")) {
        setEndDate(today.subtract(1, "day").format("YYYYMMDD"));
      } else {
        setEndDate(dateValue.endOf("month").format("YYYYMMDD"));
      }
    }
  }, [dateValue]);

  // 데이터 추가
  const handleAdd = async () => {
    // 날짜-지역 중복일 경우 처리
    if (checkDuplicate(selectedMonth, startDate, endDate, region)) {
      setAlertDuplicate(true);
      return;
    }
    setLoading(true);
    setAlertDuplicate(false);
    setAlertFailed(false);

    try {
      const items = await fetchChartData(startDate, endDate, region);
      if (items) {
        // 기상 데이터를 라인 차트에 맞게 가공 후 상태 저장
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

  // 데이터 제거
  const handleRemove = (startDate: string, endDate: string, region: string) => {
    dispatch(removeMonth({ startDate, endDate, region }));
  };

  // 상단에 날짜-지역 설정 및 선택 버튼, 데이터 유형 선택 버튼, 선택 데이터 목록
  // 순서대로 라인, 도넛 차트, 주간 예보
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
      <Box sx={rwdBoxStyle(is775Up)}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <InputDate
            tab={tab}
            dateValue={dateValue}
            setDateValue={(v) =>
              dispatch(setDateValueMonth(dayjs(v).format("YYYYMM01")))
            }
          />
          <InputRegion
            width={"100%"}
            region={region}
            setRegion={(v) => dispatch(setRegionValueMonth(v))}
          />
        </Box>
        <Button
          sx={{ width: is775Up ? "200px" : "100%" }}
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
          <Box sx={rwdBoxStyle(is775Up)}>
            <DonutTa selectedData={selectedMonth} />
            <DonutRhm selectedData={selectedMonth} />
          </Box>
          <Forecast selectedData={selectedMonth} />
        </>
      ) : (
        <EmptyContainer />
      )}
    </>
  );
}
