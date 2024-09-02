import { Box, Fab } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

export default function ModalButton({
  setModal,
}: {
  setModal: (value: boolean) => void;
}) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <Fab variant="extended" color="primary" onClick={() => setModal(true)}>
        <MapIcon sx={{ mr: 1 }} />
        Map
      </Fab>
    </Box>
  );
}
