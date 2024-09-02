import { useDispatch } from "react-redux";
import { AppDispatch, setDataTypeMonth, setDataTypeYear } from "store";

import { buttons } from "constants/dataType";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function DataTypeSelector({
  tab,
  dataType,
}: {
  tab: string;
  dataType: string;
}) {
  const dispatch: AppDispatch = useDispatch();
  const handleSetDataType = (selectedDataType: string) => {
    if (tab === "month") {
      dispatch(setDataTypeMonth(selectedDataType));
    } else {
      dispatch(setDataTypeYear(selectedDataType));
    }
  };

  return (
    <ButtonGroup aria-label="Data Type Button Group" sx={{ width: "100%" }}>
      {buttons.map((m) => (
        <Button
          key={m.value}
          variant={dataType === m.value ? "contained" : "outlined"}
          onClick={() => handleSetDataType(m.value)}
          sx={{ width: "100%", paddingX: 1 }}
        >
          {m.icon}
        </Button>
      ))}
    </ButtonGroup>
  );
}
