import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, addYear, removeYear } from "store";
import { chartOptions } from "constants/chartOptions";
import { formatYearData } from "utils/formatChartData";
import regionData from "constants/regionData.json";

interface Data {
  tm: string;
  avgTa: string;
}

function DataYear() {
  const dispatch: AppDispatch = useDispatch();
  const selectedYear = useSelector(
    (state: RootState) => state.chartData.selectedYear
  );
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<string>("20240101");
  const [endDate, setEndDate] = useState<string>("20240818");
  const [region, setRegion] = useState<string>("108");

  const handleAdd = () => {
    dispatch(addYear({ startDate, endDate, region }));
  };

  const handleRemove = (startDate: string, endDate: string, region: string) => {
    dispatch(removeYear({ startDate, endDate, region }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear.length === 0) return;
      setLoading(true);

      const newChartData: any[] = [];

      for (const { startDate, endDate, region } of selectedYear) {
        const res = await axios.get(
          `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDate}&endDt=${endDate}&stnIds=${region}`
        );
        const items: Data[] = res.data.response.body.items.item;
        newChartData.push({
          name: `${startDate} ~ ${endDate} - ${
            regionData.find((r) => r.id === region)?.name
          }`,
          data: formatYearData(items),
        });
      }

      setChartData(newChartData);
      setLoading(false);
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="시작 날짜 (YYYYMMDD)"
        />
        <input
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="종료 날짜 (YYYYMMDD)"
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {regionData.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
        <button onClick={() => console.log(chartData)}>ChartData</button>
      </div>

      <ul>
        {selectedYear.map(({ startDate, endDate, region }) => (
          <li key={`${startDate}-${endDate}-${region}`}>
            {startDate} ~ {endDate} -{" "}
            {regionData.find((r) => r.id === region)?.name}
            <button onClick={() => handleRemove(startDate, endDate, region)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {!loading ? (
        <div>
          {selectedYear.length > 0 && (
            <Chart
              options={chartOptions}
              series={chartData}
              type="line"
              height={500}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DataYear;
