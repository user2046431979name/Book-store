import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import { useEffect } from "react";
import { selectSearchs } from "./slice/search";
import { useAppSelector } from "./app/redux";
const AppContent = () => {
  // const location = useLocation();
  // console.log(location);
  // let searchResults = useAppSelector(selectSearchs);
  // let arr = [1, 2, 3, 4, 5, 67, 2];
  // console.log(arr);

  // if (location.pathname !== "/books") {
  //   arr.length = 0; // Clear the array
  // }
  return (
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
  );
};

export default AppContent;
