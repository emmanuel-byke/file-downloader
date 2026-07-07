import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Home } from "./features/components/Home";
import { AddURL } from "./features/widgets/AddURL";

function App() {
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addURL" element={<AddURL />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
