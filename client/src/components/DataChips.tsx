import dayjs from "dayjs";

import FlexBox from "components/FlexBox";
import regionData from "constants/regionData.json";
import { SelectedData } from "types/data";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function DataChips({
  type,
  selectedData,
  handleRemove,
}: {
  type: string;
  selectedData: SelectedData[];
  handleRemove: (startDate: string, endDate: string, region: string) => void;
}) {
  return (
    <FlexBox>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {selectedData.map(({ startDate, endDate, region }) => (
          <Chip
            key={`${startDate}-${endDate}-${region}`}
            label={`${dayjs(startDate).format(
              type === "month" ? "YYYY년 MM월" : "YYYY년"
            )} ${regionData.find((r) => r.id === region)?.name}`}
            onDelete={() => handleRemove(startDate, endDate, region)}
          />
        ))}
      </Stack>
    </FlexBox>
  );
}
