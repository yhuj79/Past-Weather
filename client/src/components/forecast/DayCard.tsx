import { ForecastData } from "types/forecast";

import { Card, CardContent, Typography, CardMedia } from "@mui/material";

// 주간 예보 일 카드 컴포넌트
export default function DayCard({ data }: { data: ForecastData }) {
  return (
    <Card variant="outlined" sx={{ minWidth: 120, flexGrow: 1 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px !important",
        }}
      >
        <Typography variant="body1">
          {data.day}{" "}
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "#6B6B6B" }}
          >
            {data.date}
          </Typography>
        </Typography>
        <CardMedia
          sx={{ width: 60, height: 60 }}
          image={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        />
        <Typography variant="body2">
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "#3172E7", fontWeight: 600 }}
          >
            {Math.round(data.minTemp)}°C
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "#999999" }}
          >
            {" / "}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "#CD3534", fontWeight: 600 }}
          >
            {Math.round(data.maxTemp)}°C
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
