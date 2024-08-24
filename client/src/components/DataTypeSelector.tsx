import { useDispatch } from "react-redux";
import { AppDispatch, setDataTypeMonth, setDataTypeYear } from "store";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function DataTypeSelector({
  type,
  dataType,
}: {
  type: string;
  dataType: string;
}) {
  const dispatch: AppDispatch = useDispatch();

  const handleSetDataType = (selectedDataType: string) => {
    if (type === "month") {
      dispatch(setDataTypeMonth(selectedDataType));
    } else {
      dispatch(setDataTypeYear(selectedDataType));
    }
  };

  const buttons = [
    { label: "평균 기온", value: "avgTa" },
    { label: "최저 기온", value: "minTa" },
    { label: "최고 기온", value: "maxTa" },
    { label: "평균 습도", value: "avgRhm" },
    { label: type === "month" ? "일 강수량" : "월 강수량", value: "sumRn" },
    { label: "평균 풍속", value: "avgWs" },
  ];

  return (
    <ButtonGroup aria-label="Basic button group" sx={{ marginX: 2 }}>
      {buttons.map((button) => (
        <Button
          key={button.value}
          variant={dataType === button.value ? "contained" : "outlined"}
          onClick={() => handleSetDataType(button.value)}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
