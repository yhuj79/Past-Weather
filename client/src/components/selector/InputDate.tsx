import dayjs, { Dayjs } from "dayjs";
import { MouseEvent } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function InputDate({
  tab,
  dateValue,
  setDateValue,
}: {
  tab: string;
  dateValue: Dayjs | null;
  setDateValue: (value: Dayjs | null) => void;
}) {
  const minDate = dayjs("1920-01-01");
  const maxDate = dayjs().subtract(2, "day");

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        sx={{ width: "100%", marginRight: 2 }}
        slotProps={{
          textField: {
            size: "small",
            error: dateValue === null,
            inputProps: {
              readOnly: true,
              style: { cursor: "default", fontSize: "14px" },
            },
            onMouseDown: handleMouseDown,
          },
        }}
        label={"날짜"}
        views={tab === "month" ? ["year", "month"] : ["year"]}
        format={tab === "month" ? "YYYY년 MM월" : "YYYY년"}
        minDate={minDate}
        maxDate={maxDate}
        value={dateValue}
        onChange={(newValue) => setDateValue(newValue)}
      />
    </LocalizationProvider>
  );
}
