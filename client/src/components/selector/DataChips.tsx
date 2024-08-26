import dayjs from "dayjs";

import FlexBox from "components/common/FlexBox";
import regionData from "constants/regionData.json";
import { chartColorsLine } from "constants/chartColors";
import { SelectedData } from "types/data";

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";

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
    <FlexBox rwd={false}>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {selectedData.map(({ startDate, endDate, region }, index) => (
          <Chip
            size="small"
            icon={
              <CircleIcon
                style={{
                  color: chartColorsLine[index % chartColorsLine.length],
                }}
              />
            }
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
