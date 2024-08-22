import regionData from "constants/regionData.json";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface regionProp {
  region: string;
  setRegion: (value: string) => void;
}

export default function InputRegion({ region, setRegion }: regionProp) {
  return (
    <FormControl sx={{ width: 150 }} size="small">
      <InputLabel id="label-Region">지역</InputLabel>
      <Select
        labelId="label-Region"
        id="label-Region"
        value={region}
        label="Region"
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
