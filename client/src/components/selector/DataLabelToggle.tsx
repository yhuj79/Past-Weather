import { dataLabelProp } from "types/input";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function DataLabelToggle({
  dataLabel,
  setDataLabel,
}: dataLabelProp) {
  return (
    <Box display="flex">
      <FormControlLabel
        control={
          <Switch
            checked={dataLabel}
            onChange={() => setDataLabel()}
            name="dataLabelToggle"
          />
        }
        label="레이블 표시"
      />
    </Box>
  );
}
