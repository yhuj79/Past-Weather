import { ApexOptions } from "apexcharts";

import { chartColorsLine } from "constants/chartColors";

export const getChartOptions = (
  type: string,
  dataLabels: boolean,
  tickAmount: number
): ApexOptions => {
  // User-Agent를 통해 디바이스 유형 감지
  const userAgent = navigator.userAgent.toLowerCase();
  const isDesktop = !/mobile|tablet|ipad|ipod|android|silk|kindle|playbook|bb|rim/i.test(userAgent);
  return {
    chart: {
      type: "line",
      toolbar: {
        show: true,
        tools: {
          zoom: isDesktop,
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
      tickAmount: tickAmount,
      labels: {
        show: true,
        rotate: 0,
        formatter: function (value) {
          return parseInt(value).toString() + (type === "month" ? "일" : "월");
        },
      },
    },
    legend: {
      show: false,
      position: "top",
    },
    tooltip: {
      enabled: true,
      shared: true,
    },
    colors: chartColorsLine,
  };
};
