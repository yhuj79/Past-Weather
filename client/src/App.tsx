import { useState } from "react";
import "normalize.css";

import Month from "tab/Month";
import Year from "tab/Year";
import Header from "components/common/Header";
import Map from "components/map/Map";

import { createTheme, Grid, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Slide from "@mui/material/Slide";

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
  },
});

export default function App() {
  const [tab, setTab] = useState<string>("month");
  const [prevTab, setPrevTab] = useState<string>("month");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPrevTab(tab);
    setTab(newValue);
  };

  const getDirection = (current: string, previous: string) => {
    return current > previous ? "left" : "right";
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          typography: "body1",
        }}
      >
        <Header />
        <TabContext value={tab}>
          <Grid container sx={{ height: "calc(100% - 64px)" }}>
            <Grid item xs={8}>
              <Box
                sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="월별" value="month" />
                  <Tab label="연도별" value="year" />
                </TabList>
              </Box>
              <TabPanel value="month" sx={{ padding: 0 }}>
                <Slide
                  in={tab === "month"}
                  direction={getDirection(tab, prevTab)}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <Month tab={tab} />
                  </div>
                </Slide>
              </TabPanel>
              <TabPanel value="year" sx={{ padding: 0 }}>
                <Slide
                  in={tab === "year"}
                  direction={getDirection(tab, prevTab)}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <Year tab={tab} />
                  </div>
                </Slide>
              </TabPanel>
            </Grid>
            <Grid item xs={4} sx={{ border: 1, borderColor: "divider" }}>
              <Map tab={tab} />
            </Grid>
          </Grid>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}
