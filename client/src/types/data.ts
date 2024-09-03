// Redux 스토어 ChartDataState 타입
export interface ChartDataState {
  selectedMonth: {
    startDate: string;
    endDate: string;
    region: string;
    data: {
      x: string;
      avgTa: number | null;
      maxTa: number | null;
      minTa: number | null;
      avgRhm: number | null;
      sumRn: number | null;
      avgWs: number | null;
    }[];
  }[];
  selectedYear: {
    startDate: string;
    endDate: string;
    region: string;
    data: {
      x: string;
      avgTa: number | null;
      maxTa: number | null;
      minTa: number | null;
      avgRhm: number | null;
      sumRn: number | null;
      avgWs: number | null;
    }[];
  }[];
  dataTypeMonth: string;
  dataTypeYear: string;
  dateValueMonth: string;
  dateValueYear: string;
  regionValueMonth: string;
  regionValueYear: string;
  dataLabelMonth: boolean;
  dataLabelYear: boolean;
}

// 가공 전 원본 데이터 타입
export interface VanillaData {
  tm: string;
  avgTa: string;
  maxTa: string;
  minTa: string;
  avgRhm: string;
  sumRn: string;
  avgWs: string;
}

// 차트 사용 가능하게 변환된 데이터 타입
export interface GenerateData {
  x: string;
  avgTa: number | null;
  maxTa: number | null;
  minTa: number | null;
  avgRhm: number | null;
  sumRn: number | null;
  avgWs: number | null;
}

// 선택된 데이터 타입
export interface SelectedData {
  startDate: string;
  endDate: string;
  region: string;
  data: GenerateData[];
}
