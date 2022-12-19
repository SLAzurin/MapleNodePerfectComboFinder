import { Credits } from "./components/credits";
import { NodeFinder } from "./components/node-finder";

const App = () => {
  return (
    <div className="App">
      <NodeFinder />
      <br />
      <Credits />
    </div>
  );
};

export default App;
