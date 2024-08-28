import { useDispatch } from "react-redux";
import { AppDispatch, setDataTypeMonth, setDataTypeYear } from "store";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';



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

  const buttons = [
    { value: "avgTa", icon: <ThermostatIcon />, label: "평균 기온" },
    { value: "maxTa", icon: <LightModeIcon />, label: "최고 기온" },    
    { value: "minTa", icon: <DarkModeIcon />, label: "최저 기온" },
    { value: "avgRhm", icon: <OpacityIcon />, label: "평균 습도" },
    { value: "sumRn", icon: <WaterIcon />, label: tab === "month" ? "일 강수량" : "월 강수량" },
    { value: "avgWs", icon: <AirIcon />, label: "평균 풍속" },
  ];

  return (
    <ButtonGroup aria-label="Data Type Button Group" sx={{ width: "100%" }}>
      {buttons.map((button) => (
        <Button
          key={button.value}
          variant={dataType === button.value ? "contained" : "outlined"}
          onClick={() => handleSetDataType(button.value)}
          sx={{ width: "100%", paddingX: 1 }}
        >
          {button.icon}
        </Button>
      ))}
    </ButtonGroup>
  );
}
