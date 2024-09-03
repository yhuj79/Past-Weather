import { ApexOptions } from "apexcharts";

import { chartColorsDonutRhm } from "constants/chartColors";

// 평균 습도 도넛 차트 옵션
export const chartOptions: ApexOptions = {
  chart: {
    width: "100%",
    height: "100%",
    type: "donut",
  },
  labels: [
    "10 이하",
    "10 ~ 20",
    "20 ~ 30",
    "30 ~ 40",
    "40 ~ 50",
    "50 ~ 60",
    "60 ~ 70",
    "70 ~ 80",
    "80 ~ 90",
    "90 이상",
  ],
  plotOptions: {
    pie: {
      donut: {
        size: "55%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "평균 습도",
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
  colors: chartColorsDonutRhm,
};
