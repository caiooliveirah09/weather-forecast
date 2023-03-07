import { Routes, Route, BrowserRouter } from "react-router-dom";
import WeatherPage from "./WeatherPage";
import SearchPage from "./SearchPage";
import ContactPage from "./ContactPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={WeatherPage} />
        <Route path="/search" element={SearchPage} />
        <Route path="/contact" element={ContactPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
