import { useState } from "react";
import "normalize.css";

import Month from "tab/Month";
import Year from "tab/Year";
import Header from "components/common/Header";
import Map from "components/map/Map";

import { createTheme, Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
  },
});

export default function App() {
  const is1160Up = useMediaQuery("(min-width:1160px)");
  const [tab, setTab] = useState<string>("month");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <Header />
        <TabContext value={tab}>
          <Grid container sx={{ height: "calc(100% - 64px)" }}>
            <Grid
              item
              xs={is1160Up ? 8 : 12}
              sx={{ height: "100%", overflow: "auto" }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="Chart Type Tab">
                  <Tab label="월별" value="month" />
                  <Tab label="연도별" value="year" />
                </TabList>
              </Box>
              <TabPanel
                value="month"
                sx={{ padding: 0, height: "calc(100% - 200px)" }}
              >
                <Month tab={tab} />
              </TabPanel>
              <TabPanel
                value="year"
                sx={{ padding: 0, height: "calc(100% - 200px)" }}
              >
                <Year tab={tab} />
              </TabPanel>
            </Grid>
            {is1160Up ? (
              <Grid item xs={4} sx={{ border: 1, borderColor: "divider" }}>
                <Map tab={tab} />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}
