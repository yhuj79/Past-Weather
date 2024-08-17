import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "store/store";
import { addMonth, removeMonth } from "store/store";
import { ApexOptions } from "apexcharts";

interface Data {
  tm: string;
  avgTa: string;
}

const regionData = [
  { name: "강릉", id: "105" },
  { name: "강화", id: "201" },
  { name: "거제", id: "294" },
  { name: "거창", id: "284" },
  { name: "경주", id: "283" },
  { name: "고산", id: "185" },
  { name: "고창", id: "172" },
  { name: "고창", id: "251" },
  { name: "고흥", id: "262" },
  { name: "광양", id: "266" },
  { name: "광주", id: "156" },
  { name: "구미", id: "279" },
  { name: "군산", id: "140" },
  { name: "금산", id: "238" },
  { name: "김해", id: "253" },
  { name: "남원", id: "247" },
  { name: "남해", id: "295" },
  { name: "대관령", id: "100" },
  { name: "대구", id: "143" },
  { name: "대전", id: "133" },
  { name: "동두천", id: "98" },
  { name: "동해", id: "106" },
  { name: "목포", id: "165" },
  { name: "문경", id: "273" },
  { name: "밀양", id: "288" },
  { name: "백령도", id: "102" },
  { name: "보령", id: "235" },
  { name: "보성", id: "258" },
  { name: "보은", id: "226" },
  { name: "봉화", id: "271" },
  { name: "부산", id: "159" },
  { name: "부안", id: "243" },
  { name: "부여", id: "236" },
  { name: "산청", id: "289" },
  { name: "상주", id: "137" },
  { name: "서귀포", id: "189" },
  { name: "서산", id: "129" },
  { name: "서울", id: "108" },
  { name: "성산", id: "188" },
  { name: "세종", id: "239" },
  { name: "속초", id: "90" },
  { name: "수원", id: "119" },
  { name: "순창", id: "254" },
  { name: "순천", id: "174" },
  { name: "안동", id: "136" },
  { name: "양산", id: "257" },
  { name: "양평", id: "202" },
  { name: "여수", id: "168" },
  { name: "영광", id: "252" },
  { name: "영덕", id: "277" },
  { name: "영월", id: "121" },
  { name: "영주", id: "272" },
  { name: "영천", id: "281" },
  { name: "완도", id: "170" },
  { name: "울릉도", id: "115" },
  { name: "울산", id: "152" },
  { name: "울진", id: "130" },
  { name: "원주", id: "114" },
  { name: "의령", id: "263" },
  { name: "의성", id: "278" },
  { name: "이천", id: "203" },
  { name: "인제", id: "211" },
  { name: "인천", id: "112" },
  { name: "임실", id: "244" },
  { name: "장수", id: "248" },
  { name: "장흥", id: "260" },
  { name: "전주", id: "146" },
  { name: "정선", id: "217" },
  { name: "정읍", id: "245" },
  { name: "제주", id: "184" },
  { name: "제천", id: "221" },
  { name: "진도", id: "268" },
  { name: "진주", id: "192" },
  { name: "창원", id: "155" },
  { name: "천안", id: "232" },
  { name: "철원", id: "95" },
  { name: "청송", id: "276" },
  { name: "청주", id: "131" },
  { name: "추풍령", id: "135" },
  { name: "춘천", id: "101" },
  { name: "충주", id: "127" },
  { name: "태백", id: "216" },
  { name: "통영", id: "162" },
  { name: "파주", id: "99" },
  { name: "포항", id: "138" },
  { name: "함양", id: "264" },
  { name: "합천", id: "285" },
  { name: "해남", id: "261" },
  { name: "홍성", id: "177" },
  { name: "홍천", id: "212" },
  { name: "흑산도", id: "169" },
];

const formatChartData = (data: Data[]) => {
  return data.map((item) => {
    const date = new Date(item.tm);
    const day = String(date.getDate()).padStart(2, "0");
    return {
      x: day,
      y: parseFloat(item.avgTa),
    };
  });
};

function DataMonth() {
  const dispatch: AppDispatch = useDispatch();
  const selectedMonths = useSelector(
    (state: RootState) => state.chartData.selectedMonths
  );
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [year, setYear] = useState<string>("2024");
  const [month, setMonth] = useState<string>("08");
  const [region, setRegion] = useState<string>("108");

  const handleAdd = () => {
    dispatch(addMonth({ year, month, region }));
  };

  const handleRemove = (year: string, month: string, region: string) => {
    dispatch(removeMonth({ year, month, region }));
  };

  const getLastDayOfMonth = (year: string, month: string) => {
    const now = new Date();
    const selectedDate = new Date(Number(year), Number(month) - 1);

    // 선택한 연도와 월이 현재 연도와 월이면 어제 날짜 반환
    if (
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth()
    ) {
      return now.getDate() - 1;
    } else {
      // 그 외는 해당 월의 마지막 날 반환
      return new Date(Number(year), Number(month), 0).getDate();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMonths.length === 0) return;
      setLoading(true);

      const newChartData: any[] = [];

      for (const { year, month, region } of selectedMonths) {
        const lastDay = getLastDayOfMonth(year, month); // 해당 월의 마지막 날짜 계산
        const startDt = `${year}${month}01`;
        const endDt = `${year}${month}${String(lastDay).padStart(2, "0")}`;
        const res = await axios.get(
          `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=999&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${startDt}&endDt=${endDt}&stnIds=${region}`
        );
        const items: Data[] = res.data.response.body.items.item;
        newChartData.push({
          name: `${year} ${month} - ${
            regionData.find((r) => r.id === region)?.name
          }`,
          data: formatChartData(items),
        });
      }

      setChartData(newChartData);
      setLoading(false);
    };

    fetchData();
  }, [selectedMonths]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 500,
      toolbar: {
        show: true, // 툴바 보이기/숨기기
        tools: {
          zoom: true, // 줌
          zoomin: true, // 확대
          zoomout: true, // 축소
          download: true, // 다운로드 버튼
          pan: false, // 이동
          reset: false, // 줌 리셋
          selection: false, // 범위 선택
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      title: {
        text: "Date",
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Average Temperature (°C)",
      },
    },
    colors: ["#4682B4", "#32CD32", "#FF6347", "#FFA500"],
    legend: {
      position: "top",
    },
    tooltip: {
      x: {
        formatter: (val) => `${val}일`,
      },
    },
  };

  return (
    <div>
      <div>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="01">1월</option>
          <option value="02">2월</option>
          <option value="03">3월</option>
          <option value="04">4월</option>
          <option value="05">5월</option>
          <option value="06">6월</option>
          <option value="07">7월</option>
          <option value="08">8월</option>
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {regionData.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {selectedMonths.map(({ year, month, region }) => (
          <li key={`${year}-${month}-${region}`}>
            {year}-{month} - {regionData.find((r) => r.id === region)?.name}
            <button onClick={() => handleRemove(year, month, region)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {!loading ? (
        <div>
          <Chart
            options={chartOptions}
            series={chartData}
            type="line"
            height={500}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DataMonth;
