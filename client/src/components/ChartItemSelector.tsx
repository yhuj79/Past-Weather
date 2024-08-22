import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

interface itemProp {
  dataType: string;
  setDataType: (value: string) => void;
}

export default function ChartItemSelector({ dataType, setDataType }: itemProp) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setDataType(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={dataType}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="평균 기온" value="avgTa" />
            <Tab label="최저 기온" value="minTa" />
            <Tab label="최고 기온" value="maxTa" />
            <Tab label="평균 습도" value="avgRhm" />
            <Tab label="일 강수량" value="sumRn" />
            <Tab label="평균 풍속" value="avgWs" />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
