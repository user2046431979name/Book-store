import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom"; // Import useLocation
import {useAppDispatch} from "../../app/redux";
import Card from "../../components/Card/Card";
import {clearSearch, getNextSearchs, getPreviousSearchs, useSearch,} from "../../slice/search";
import SearchBar from "./SearchBar";
import {getBooks, useBooks} from "../../slice/book";

const Book: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: books } = useBooks();
  const { list, pagination, currentPage } = useSearch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSearch());
  }, [location, dispatch]);

  const handleNext = () => {
    if (pagination.next) {
      dispatch(getNextSearchs(pagination.next));
    }
  };

  const handlePrevious = () => {
    if (pagination.previous) {
      dispatch(getPreviousSearchs(pagination.previous));
    }
  };

  return (
    <div className="search container">
      {books.length === 0 ? (
        <h1>Книг пока что нет</h1>
      ) : (
        <>
          <SearchBar/>
          <div className="container">
            <div className="row">
              {list.map((search) => (
                <div className="col-4" key={search.id}>
                  <Card book={search} />
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={handlePrevious} disabled={!pagination.previous}>
                <ArrowBackIcon />
              </button>
              <p>{currentPage}</p>
              <button onClick={handleNext} disabled={!pagination.next}>
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Book;
