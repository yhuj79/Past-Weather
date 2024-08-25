import { ApexOptions } from "apexcharts";

import { chartColors } from "constants/chartColors";

export const getChartOptions = (
  type: string,
  dataLabels: boolean
): ApexOptions => {
  return {
    chart: {
      type: "line",
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          download: true,
          pan: false,
          reset: false,
          selection: false,
        },
      },
    },
    dataLabels: {
      enabled: dataLabels,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      tickAmount: 12,
      labels: {
        show: true,
        formatter: function (value) {
          return parseInt(value).toString() + (type === "month" ? "일" : "월");
        },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
    },
    colors: chartColors,
  };
};
