import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../pages/App";
import Company from "../pages/Company";

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/company" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
