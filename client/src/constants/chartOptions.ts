import { ApexOptions } from "apexcharts";

export const chartOptions: ApexOptions = {
  chart: {
    type: "line",
    height: 600,
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
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    labels: { show: false },
  },
  yaxis: {
    title: {
      text: "Average Temperature (°C)",
    },
  },
  colors: ["#4682B4", "#32CD32", "#FF6347", "#FFA500"],
  legend: {
    position: "bottom",
  },
  tooltip: {
    enabled: true,
    shared: true,
  },
};
