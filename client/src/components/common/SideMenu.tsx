import { useEffect, useState } from "react";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Box from "@mui/material/Box";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

// 사이드 메뉴 아이템 컴포넌트
const FaviconListItem = ({ url, text }: { url: string; text: string }) => {
  const [favicon, setFavicon] = useState<string>("");

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 해당 사이트의 Favicon을 불러오기
  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${
          new URL(url).hostname
        }`;
        setFavicon(faviconUrl);
      } catch (error) {
        console.error("Failed to fetch favicon:", error);
      }
    };

    fetchFavicon();
  }, [url]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => handleLinkClick(url)}>
        <ListItemIcon>
          {favicon ? (
            <img
              src={favicon}
              alt="favicon"
              style={{ width: 22, height: 22, marginLeft: 2 }}
            />
          ) : (
            <TravelExploreIcon />
          )}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ fontSize: "15px" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

// 헤더 좌측 사이드 메뉴 컴포넌트
export default function SideMenu({
  menu,
  setMenu,
}: {
  menu: boolean;
  setMenu: (value: boolean) => void;
}) {
  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={() => setMenu(false)}>
      <List subheader={<ListSubheader>API 사용 정보</ListSubheader>}>
        <FaviconListItem
          url="https://www.data.go.kr/data/15059093/openapi.do"
          text="종관기상관측 (ASOS)"
        />
        <FaviconListItem
          url="https://openweathermap.org/api/one-call-api"
          text="OpenWeatherMap"
        />
      </List>
      <Divider />
      <List subheader={<ListSubheader>과거 관측 정보</ListSubheader>}>
        <FaviconListItem
          url="https://www.weather.go.kr/w/observation/land/past-obs/obs-by-day.do"
          text="과거관측 일별 자료"
        />
        <FaviconListItem
          url="https://weather.kweather.co.kr/weather/legacy_weather"
          text="케이웨더 과거 날씨"
        />
        <FaviconListItem
          url="https://www.weatheri.co.kr/bygone/bygone11.php"
          text="웨더아이 통계 자료"
        />
      </List>
      <Divider />
      <List subheader={<ListSubheader>주요 날씨 사이트</ListSubheader>}>
        <FaviconListItem
          url="https://www.weather.go.kr/w/index.do"
          text="기상청 날씨누리"
        />
        <FaviconListItem
          url="https://www.accuweather.com"
          text="AccuWeather"
        />
        <FaviconListItem
          url="https://weather.com/ko-KR/weather/today"
          text="Weather Channel"
        />
        <FaviconListItem
          url="https://weather.kweather.co.kr/weather/forecast"
          text="케이웨더"
        />
      </List>
      <Divider />
      <List>
        <FaviconListItem
          url="https://github.com/yhuj79/Past-Weather"
          text="Repository"
        />
      </List>
    </Box>
  );

  return (
    <Drawer open={menu} onClose={() => setMenu(false)}>
      {DrawerList}
    </Drawer>
  );
}
