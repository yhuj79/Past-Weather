import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// 스위치 커스텀
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-root": {
    paddingTop: "3px !important",
  },
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#39393D" : "#E9E9EA",
    boxSizing: "border-box",
  },
}));

// 데이터 레이블 표시 토글 컴포넌트
export default function DataLabelToggle({
  dataLabel,
  setDataLabel,
}: {
  dataLabel: boolean;
  setDataLabel: () => void;
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Box sx={{ paddingTop: "2.5px" }}>
        <AntSwitch
          checked={dataLabel}
          onChange={() => setDataLabel()}
          inputProps={{ "aria-label": "data label toggle" }}
        />
      </Box>
      <Typography sx={{ fontSize: "13px" }}>데이터 레이블</Typography>
    </Stack>
  );
}
