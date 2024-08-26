import { ApexOptions } from "apexcharts";

import { chartColorsDonutTa } from "constants/chartColors";

export const chartOptions: ApexOptions = {
  chart: {
    width: "100%",
    height: "100%",
    type: "donut",
  },
  labels: [
    "-10°C 이하",
    "-10 ~ -5°C",
    "-5 ~ 0°C",
    "0 ~ 5°C",
    "5 ~ 10°C",
    "10 ~ 15°C",
    "15 ~ 20°C",
    "20 ~ 25°C",
    "25 ~ 30°C",
    "30°C 이상",
  ],
  plotOptions: {
    pie: {
      donut: {
        size: "55%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "평균 기온",
            fontFamily: "Noto Sans KR, sans-serif",
            fontWeight: "400",
            fontSize: "1.2rem",
            formatter(w) {
              return (
                w.globals.seriesTotals.reduce(
                  (a: number, b: number) => a + b,
                  0
                ) + " data"
              );
            },
          },
          value: {
            fontFamily: "Noto Sans KR, sans-serif",
            fontWeight: "400",
            fontSize: "1.2rem",
            formatter(val) {
              return val + " data";
            },
          },
        },
      },
      dataLabels: {
        offset: 0,
      },
    },
  },
  grid: {
    padding: {
      top: 10,
      bottom: 8,
      left: 8,
      right: 8,
    },
  },
  dataLabels: {
    formatter(val: number): string | number {
      return [val.toFixed(1) + "%"] as unknown as string | number;
    },
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: true,
    offsetY: -12,
    itemMargin: {
      horizontal: 0,
      vertical: 1,
    },
  },
  colors: chartColorsDonutTa,
};
