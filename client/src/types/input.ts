import { Dayjs } from "dayjs";

export interface dateProp {
  type: string;
  dateValue: Dayjs | null;
  setDateValue: (value: Dayjs | null) => void;
}

export interface regionProp {
  region: string;
  setRegion: (value: string) => void;
}
