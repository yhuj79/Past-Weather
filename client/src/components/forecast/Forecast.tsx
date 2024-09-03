import { useState, useEffect } from "react";

import InputRegion from "components/selector/InputRegion";
import DayCard from "components/forecast/DayCard";
import regionData from "constants/regionData.json";
import { fetchForecastData } from "utils/fetchData";
import { SelectedData } from "types/data";
import { ForecastData } from "types/forecast";

import { Box, Typography, Paper, CircularProgress, Fade } from "@mui/material";

// 주간 예보 컴포넌트
export default function Forecast({
  selectedData,
}: {
  selectedData: SelectedData[];
}) {
  const [currentRegion, setCurrentRegion] = useState<string>("");
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // regionData.json에서 현재 선택 지역 정보 획득
  const currentRegionInfo = regionData.find(
    (region) => region.id === currentRegion
  );

  // 선택된 데이터 값이 변경될 때마다 마지막 선택 지역을 현재 지역으로 설정
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
              <InputRegion
                width={"120px"}
                region={currentRegion}
                setRegion={(e) => setCurrentRegion(e)}
              />
            </Box>
            <Fade in={!isLoading}>
              {!isLoading ? (
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
              ) : (
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
              )}
            </Fade>
          </>
        )}
      </Box>
    </Paper>
  );
}
