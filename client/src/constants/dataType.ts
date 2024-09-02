import React from "react";

import ThermostatIcon from "@mui/icons-material/Thermostat";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import OpacityIcon from "@mui/icons-material/Opacity";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";

export const buttons = [
  { value: "avgTa", icon: React.createElement(ThermostatIcon) },
  { value: "maxTa", icon: React.createElement(LightModeIcon) },
  { value: "minTa", icon: React.createElement(DarkModeIcon) },
  { value: "avgRhm", icon: React.createElement(OpacityIcon) },
  { value: "sumRn", icon: React.createElement(WaterIcon) },
  { value: "avgWs", icon: React.createElement(AirIcon) },
];

export const dataTypeLabel: { [key: string]: string } = {
  avgTa: "평균 기온 ",
  maxTa: "최고 기온 ",
  minTa: "최저 기온 ",
  avgRhm: "평균 습도 ",
  sumRn: "강수량 ",
  avgWs: "평균 풍속 ",
};

export const dataTypeUnit: { [key: string]: string } = {
  avgTa: "(°C)",
  maxTa: "(°C)",
  minTa: "(°C)",
  avgRhm: "(%)",
  sumRn: "(mm)",
  avgWs: "(m/s)",
};
