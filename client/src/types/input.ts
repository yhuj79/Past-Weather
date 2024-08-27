import { Dayjs } from "dayjs";

export interface dateProp {
  tab: string;
  dateValue: Dayjs | null;
  setDateValue: (value: Dayjs | null) => void;
}

export interface regionProp {
  region: string;
  setRegion: (value: string) => void;
}

export interface dataLabelProp {
  dataLabel: boolean;
  setDataLabel: () => void;
}
