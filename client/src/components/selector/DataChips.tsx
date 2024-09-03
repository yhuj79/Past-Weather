import dayjs from "dayjs";

import regionData from "constants/regionData.json";
import { chartColorsLine } from "constants/chartColors";
import { SelectedData } from "types/data";

import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";

// 선택 데이터 목록 칩 컴포넌트
export default function DataChips({
  tab,
  selectedData,
  handleRemove,
}: {
  tab: string;
  selectedData: SelectedData[];
  handleRemove: (startDate: string, endDate: string, region: string) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: 2,
        gap: 2,
      }}
    >
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
              tab === "month" ? "YYYY년 MM월" : "YYYY년"
            )} ${regionData.find((r) => r.id === region)?.name}`}
            onDelete={() => handleRemove(startDate, endDate, region)}
          />
        ))}
      </Stack>
    </Box>
  );
}
