import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

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
