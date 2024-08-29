import { ApexOptions } from "apexcharts";

import { chartColorsDonutTa } from "constants/chartColors";

export const chartOptions: ApexOptions = {
  chart: {
    width: "100%",
    height: "100%",
    type: "donut",
  },
  labels: [
    "-10 이하",
    "-10 ~ -5",
    "-5 ~ 0",
    "0 ~ 5",
    "5 ~ 10",
    "10 ~ 15",
    "15 ~ 20",
    "20 ~ 25",
    "25 ~ 30",
    "30 이상",
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
            fontSize: "1.1rem",
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
            fontSize: "1.1rem",
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
      top: 15,
      bottom: 12,
      left: 12,
      right: 12,
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
    width: 65,
    offsetY: -12,
    itemMargin: {
      horizontal: 0,
      vertical: 1,
    },
  },
  colors: chartColorsDonutTa,
};
