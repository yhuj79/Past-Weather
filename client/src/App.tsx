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
import Fab from "@mui/material/Fab";
import MapIcon from "@mui/icons-material/Map";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
  },
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "10px",
  boxShadow: 24,
};

export default function App() {
  const is1160Up = useMediaQuery("(min-width:1160px)");
  const [tab, setTab] = useState<string>("month");
  const [modal, setModal] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <Header />
        <TabContext value={tab}>
          <Grid container sx={{ height: "calc(100% - 64px)" }}>
            <Grid item xs={is1160Up ? 8 : 12} sx={{ height: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="Chart Type Tab">
                  <Tab label="월별" value="month" />
                  <Tab label="연도별" value="year" />
                </TabList>
              </Box>
              <TabPanel
                value="month"
                sx={{
                  padding: 0,
                  height: "calc(100% - 49px)",
                  overflowY: "scroll",
                }}
              >
                <Month tab={tab} />
              </TabPanel>
              <TabPanel
                value="year"
                sx={{
                  padding: 0,
                  height: "calc(100% - 49px)",
                  overflowY: "scroll",
                }}
              >
                <Year tab={tab} />
              </TabPanel>
            </Grid>
            {is1160Up ? (
              <Grid item xs={4} sx={{ border: 1, borderColor: "divider" }}>
                <Map tab={tab} />
              </Grid>
            ) : (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 20,
                  right: 20,
                  zIndex: 9999,
                }}
              >
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={() => setModal(true)}
                >
                  <MapIcon sx={{ mr: 1 }} />
                  Map
                </Fab>
              </Box>
            )}
          </Grid>
          <Modal
            sx={{ zIndex: 10000 }}
            open={modal}
            onClose={() => setModal(false)}
            closeAfterTransition
          >
            <Fade in={modal}>
              <Box sx={style}>
                <Map tab={tab} modal={() => setModal(false)} />
              </Box>
            </Fade>
          </Modal>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}
