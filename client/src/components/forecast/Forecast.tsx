import { useState, useEffect } from "react";

import DayCard from "components/forecast/DayCard";
import regionData from "constants/regionData.json";
import { fetchForecastData } from "utils/fetchData";
import { SelectedData } from "types/data";
import { ForecastData } from "types/forecast";

import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Fade,
} from "@mui/material";

export default function Forecast({
  selectedData,
}: {
  selectedData: SelectedData[];
}) {
  const [currentRegion, setCurrentRegion] = useState<string>("");
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentRegionInfo = regionData.find(
    (region) => region.id === currentRegion
  );

  useEffect(() => {
    setCurrentRegion(selectedData[selectedData.length - 1]?.region);
  }, [selectedData]);

  useEffect(() => {
    if (currentRegionInfo) {
      const fetchForecast = async () => {
        setIsLoading(true);
        const data = await fetchForecastData(
          currentRegionInfo.latitude,
          currentRegionInfo.longitude
        );
        setForecastData(data);
        setIsLoading(false);
      };
      fetchForecast();
    }
  }, [currentRegionInfo]);

  return (
    <Paper
      sx={{ height: "198px", margin: 2, padding: 2, paddingBottom: 1 }}
      elevation={3}
    >
      <Box>
        {forecastData.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 1,
              }}
            >
              <Typography variant="h5">주간 예보</Typography>
              <FormControl sx={{ width: "120px" }} size="small">
                <InputLabel sx={{ fontSize: 14 }} id="label-forecast">
                  지역
                </InputLabel>
                <Select
                  labelId="label-forecast"
                  id="label-forecast"
                  value={currentRegion}
                  label="Forecast"
                  sx={{ fontSize: 14 }}
                  MenuProps={{ style: { maxHeight: 360 } }}
                  onChange={(e) => setCurrentRegion(e.target.value)}
                >
                  {regionData.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Fade in={!isLoading}>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    paddingY: 1,
                    overflowX: "auto",
                  }}
                >
                  {forecastData.map((day, index) => (
                    <DayCard data={day} key={index} />
                  ))}
                </Box>
              )}
            </Fade>
          </>
        )}
      </Box>
    </Paper>
  );
}
