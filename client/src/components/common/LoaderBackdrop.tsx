import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";

// 데이터 로딩 화면 컴포넌트
export default function LoaderBackdrop({ loading }: { loading: boolean }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      onClick={() => null}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
