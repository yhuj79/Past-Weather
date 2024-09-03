import { createPortal } from "react-dom";
import { useMap } from "react-leaflet";

import CloseIcon from "@mui/icons-material/Close";
import { Fab } from "@mui/material";

// 지도 닫기 버튼 컴포넌트
export default function CloseButton({ modal }: { modal: () => void }) {
  const map = useMap();

  return createPortal(
    <Fab
      style={{
        position: "absolute",
        top: "-7px",
        right: "-7px",
        transform: "scale(0.4)",
        zIndex: 1000,
      }}
    >
      <CloseIcon
        fontSize="small"
        style={{ transform: "scale(2)" }}
        onClick={modal}
      />
    </Fab>,
    map.getContainer()
  );
}
