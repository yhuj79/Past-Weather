import "normalize.css";
import DataMonth from "components/DataMonth";

function App() {
  return (
    <div style={{ margin: "30px" }}>
      <h1>Temperature Graph</h1>
      <button onClick={() => window.location.reload()}>Reload</button>
      <DataMonth />
    </div>
  );
}

export default App;
