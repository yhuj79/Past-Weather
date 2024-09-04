import { useState } from "react";
import "normalize.css";

import Month from "tab/Month";
import Year from "tab/Year";
import Header from "components/common/Header";
import Map from "components/map/Map";
import ModalButton from "components/map/ModalButton";
import { theme } from "styles/theme";
import { tabStyle, mapModalStyle } from "styles/base";

import { Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function App() {
  const is1160Up = useMediaQuery("(min-width:1160px)");
  const [tab, setTab] = useState<string>("month");
  const [modal, setModal] = useState<boolean>(false);

  // 탭으로 월별(Month) 및 연도별(Year) 전환
  // 큰 화면에서 지도(Map) 우측 고정, 작은 화면에서 모달(Modal) 사용
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <Header />
        <TabContext value={tab}>
          <Grid container sx={{ height: "calc(100% - 64px)" }}>
            <Grid item xs={is1160Up ? 8 : 12} sx={{ height: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={(e, v) => setTab(v)}
                  aria-label="Chart Type Tab"
                >
                  <Tab label="월별" value="month" />
                  <Tab label="연도별" value="year" />
                </TabList>
              </Box>
              <TabPanel value="month" sx={tabStyle}>
                <Month tab={tab} />
              </TabPanel>
              <TabPanel value="year" sx={tabStyle}>
                <Year tab={tab} />
              </TabPanel>
            </Grid>
            {is1160Up ? (
              <Grid item xs={4} sx={{ border: 1, borderColor: "divider" }}>
                <Map tab={tab} />
              </Grid>
            ) : (
              <ModalButton setModal={setModal} />
            )}
          </Grid>
          <Modal
            sx={{ zIndex: 10000 }}
            open={modal}
            onClose={() => setModal(false)}
            closeAfterTransition
          >
            <Fade in={modal}>
              <Box sx={mapModalStyle}>
                <Map tab={tab} modal={() => setModal(false)} />
              </Box>
            </Fade>
          </Modal>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}
