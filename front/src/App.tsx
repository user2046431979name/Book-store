import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import BookCategory from "./pages/BookCategory/BookCategory";
import Category from "./pages/Category/Category";
import Contact from "./pages/Contact/Contact";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import NewRelease from "./pages/NewRelease/NewRelease";
import Book from "./pages/Search/Book";
import "./style/style.scss";
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
            <Route path="/books" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:id" element={<BookCategory />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
