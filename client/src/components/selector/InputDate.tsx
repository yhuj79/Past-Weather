import dayjs from "dayjs";

import { dateProp } from "types/input";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function InputDate({ type, dateValue, setDateValue }: dateProp) {
  const minDate = dayjs("1920-01-01");
  const maxDate = dayjs().subtract(1, "day");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        sx={{ width: 150 }}
        slotProps={{ textField: { size: "small" } }}
        label={"날짜"}
        views={type === "month" ? ["year", "month"] : ["year"]}
        format={type === "month" ? "YYYY년 MM월" : "YYYY년"}
        minDate={minDate}
        maxDate={maxDate}
        value={dateValue}
        onChange={(newValue) => setDateValue(newValue)}
      />
    </LocalizationProvider>
  );
}
