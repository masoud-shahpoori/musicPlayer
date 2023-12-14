import "./App.css";
import MusicContainer from "./musicContainer";

function App() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="title text-2xl"> music player</h2>
      <MusicContainer />
    </div>
  );
}

export default App;
