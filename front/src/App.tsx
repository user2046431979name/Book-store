import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import NewRelease from "./pages/NewRelease/NewRelease";
import Search from "./pages/Search/Search";
import "./style/style.scss";
import Contact from "./pages/Contact/Contact";
const App = () => {
  return (
    <BrowserRouter>
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<Details />} />
            <Route path="/new" element={<NewRelease />} />
            <Route path="/books" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
