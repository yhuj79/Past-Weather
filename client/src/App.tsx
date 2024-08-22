import { useState } from "react";
import "normalize.css";

import ChartMonth from "components/ChartMonth";
import ChartYear from "components/ChartYear";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function App() {
  const [dateTab, setDateTab] = useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setDateTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={dateTab}>
        <Box
          sx={{
            bgcolor: "#019BE5",
          }}
        >
          <TabList
            sx={{
              "& button": {
                color: "#FFFFFF",
              },
              "& button:hover": { background: "#1aa5e7" },
              "& button.Mui-selected": {
                color: "#FFFFFF",
              },
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#FFFFFF",
              },
            }}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="월별" value="1" />
            <Tab label="연도별" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <ChartMonth />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <ChartYear />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
