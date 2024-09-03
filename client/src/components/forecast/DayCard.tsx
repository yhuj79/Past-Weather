import { ForecastData } from "types/forecast";

import { Card, CardContent, Typography, CardMedia } from "@mui/material";

// 주간 예보 일 카드 컴포넌트
export default function DayCard({ data }: { data: ForecastData }) {
  return (
    <Card variant="outlined" sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px !important",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "14px" }}>
          {data.day}{" "}
          <Typography
            component="span"
            sx={{ color: "#6B6B6B", fontSize: "12px" }}
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
            component="span"
            sx={{ color: "#3172E7", fontSize: "12px", fontWeight: 600 }}
          >
            {Math.round(data.minTemp)}°C
          </Typography>
          <Typography
            component="span"
            sx={{ color: "#999999", fontSize: "12px" }}
          >
            {" / "}
          </Typography>
          <Typography
            component="span"
            sx={{ color: "#CD3534", fontSize: "12px", fontWeight: 600 }}
          >
            {Math.round(data.maxTemp)}°C
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
