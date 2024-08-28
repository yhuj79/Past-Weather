import regionData from "constants/regionData.json";
import { regionProp } from "types/input";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function InputRegion({ region, setRegion }: regionProp) {
  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel sx={{ fontSize: 14 }} id="label-Region">
        지역
      </InputLabel>
      <Select
        labelId="label-Region"
        id="label-Region"
        value={region}
        label="Region"
        sx={{ fontSize: 14 }}
        MenuProps={{ style: { maxHeight: 360 } }}
        onChange={(e) => setRegion(e.target.value)}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {regionData.map((m) => (
          <MenuItem key={m.id} value={m.id}>
            {m.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
