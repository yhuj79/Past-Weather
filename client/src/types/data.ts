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
  // avgTaDistMonth: number[];
  // avgTaDistYear: number[];
  dataTypeMonth: string;
  dataTypeYear: string;
  dateValueMonth: string;
  dateValueYear: string;
  regionValueMonth: string;
  regionValueYear: string;
  dataLabelMonth: boolean;
  dataLabelYear: boolean;
}

export interface VanillaData {
  tm: string;
  avgTa: string;
  maxTa: string;
  minTa: string;
  avgRhm: string;
  sumRn: string;
  avgWs: string;
}

export interface GenerateData {
  x: string;
  avgTa: number | null;
  maxTa: number | null;
  minTa: number | null;
  avgRhm: number | null;
  sumRn: number | null;
  avgWs: number | null;
}

export interface SelectedData {
  startDate: string;
  endDate: string;
  region: string;
  data: GenerateData[];
}
