import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./views/Game";
import Home from "./views/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/game' element={<Game/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;