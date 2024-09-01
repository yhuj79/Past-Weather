import { useState, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import DayCard from "components/forecast/DayCard";
import { fetchForecastData } from "utils/fetchData";
import regionData from "constants/regionData.json";
import { SelectedData } from "types/data";
import { ForecastData } from "types/forecast";
import { Box, Typography, Paper } from "@mui/material";

export default function Forecast({
  selectedData,
}: {
  selectedData: SelectedData[];
}) {
  const [currentRegionIndex, setCurrentRegionIndex] = useState<number>(0);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  const currentRegionId = selectedData[currentRegionIndex]?.region;
  const currentRegionInfo = regionData.find(
    (region) => region.id === currentRegionId
  );

  useEffect(() => {
    if (currentRegionInfo) {
      const fetchForecast = async () => {
        const data = await fetchForecastData(
          currentRegionInfo.latitude,
          currentRegionInfo.longitude
        );
        setForecastData(data);
      };
      fetchForecast();
    }
  }, [currentRegionInfo]);

  const handleRegionChange = (index: number) => {
    setCurrentRegionIndex(index);
  };

  return (
    <Paper sx={{ margin: 2, padding: 2, paddingBottom: 1 }} elevation={3}>
      {forecastData.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              overflowX: "auto",
              flexWrap: "wrap",
              whiteSpace: "nowrap",
              paddingBottom: 1,
            }}
          >
            <Typography variant="h5">
              주간 예보
            </Typography>
            <ButtonGroup variant="outlined" color="primary">
              {selectedData.map((data, index) => (
                <Button
                  key={data.region}
                  onClick={() => handleRegionChange(index)}
                  variant={
                    currentRegionIndex === index ? "contained" : "outlined"
                  }
                >
                  {regionData.find((region) => region.id === data.region)?.name}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
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
        </>
      )}
    </Paper>
  );
}
