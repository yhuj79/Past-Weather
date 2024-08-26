import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { Typography } from "@mui/material";

export default function EmptyContainer() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
      }}
    >
      <Box textAlign="center">
        <AllInboxIcon color="primary" sx={{ fontSize: 50 }} />
        <Typography sx={{ marginY: 1 }} variant="h5">
          데이터가 없습니다.
        </Typography>
        <Typography sx={{ marginY: 1 }} variant="body1">
          날짜와 지역을 선택하고 차트를 생성하세요.
        </Typography>
      </Box>
    </Container>
  );
}
