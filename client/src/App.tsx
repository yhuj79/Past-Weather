import "normalize.css";
import DataMonth from "DataMonth";
import DataYear from "DataYear";

function App() {
  return (
    <div style={{ margin: "30px" }}>
      <h1>Temperature Graph</h1>
      <button onClick={() => window.location.reload()}>Reload</button>
      <DataMonth />
      <DataYear />
    </div>
  );
}

export default App;
