import { useState } from "react";
import "normalize.css";

import Header from "components/Header";
import ChartMonth from "components/ChartMonth";
import ChartYear from "components/ChartYear";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Slide from "@mui/material/Slide";

export default function App() {
  const [dateTab, setDateTab] = useState<string>("1");
  const [prevTab, setPrevTab] = useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPrevTab(dateTab);
    setDateTab(newValue);
  };

  const getDirection = (current: string, previous: string) => {
    return current > previous ? "left" : "right";
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Header />
      <TabContext value={dateTab}>
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="월별" value="1" />
            <Tab label="연도별" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <Slide
            in={dateTab === "1"}
            direction={getDirection(dateTab, prevTab)}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <ChartMonth />
            </div>
          </Slide>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <Slide
            in={dateTab === "2"}
            direction={getDirection(dateTab, prevTab)}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <ChartYear />
            </div>
          </Slide>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
