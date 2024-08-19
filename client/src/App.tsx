import { useSelector } from "react-redux";
import { RootState } from "store";

import "normalize.css";
import DataMonth from "components/DataMonth";
import DataYear from "components/DataYear";

function App() {
  const selectedMonth = useSelector(
    (state: RootState) => state.chartData.selectedMonth
  );
  const selectedYear = useSelector(
    (state: RootState) => state.chartData.selectedYear
  );
  return (
    <div style={{ margin: "30px" }}>
      <h1>Temperature Graph</h1>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button onClick={() => console.log(selectedMonth)}>SelectedMonth</button>
      <button onClick={() => console.log(selectedYear)}>SelectedYear</button>
      <br />
      <br />
      <DataYear />
      <DataMonth />
    </div>
  );
}

export default App;
