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
    tickAmount: 6,
    labels: { show: true },
  },
  yaxis: {
    title: {
      text: "Average Temperature (°C)",
    },
  },
  legend: {
    position: "bottom",
  },
  tooltip: {
    enabled: true,
    shared: true,
  },
};
