import { Nav, Bio, Gallery } from "./components";
import "./css/App.css";
import "./css/Queries.css";

const App = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <Bio />
        <Gallery />
      </div>
    </>
  );
};

export default App;
