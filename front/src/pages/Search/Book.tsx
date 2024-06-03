import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import Card from "../../components/Card/Card";
import {
  getBooks,
  getBooksByPage,
  getNextBooks,
  getPreviousBooks,
  useBooks,
} from "../../slice/book";
import { getCategories, useCategories } from "../../slice/category";
import { selectSearchs, setSearch } from "../../slice/search";
import { SearchBook } from "../../type";
import SearchForm from "./SearchForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
const Book: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useCategories();

  const searchResults = useAppSelector(selectSearchs);
  const { list, pagination, currentPage, totalPages } = useBooks();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
  }, [dispatch]);

  const onSearchSubmit = (search: SearchBook) => {
    dispatch(setSearch(search));
  };

  const handleNext = () => {
    if (pagination.next) {
      dispatch(getNextBooks(pagination.next));
    }
  };

  const handlePrevious = () => {
    if (pagination.previous) {
      dispatch(getPreviousBooks(pagination.previous));
    }
  };

  const handlePageClick = (page: number) => {
    dispatch(getBooksByPage(page));
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const shouldShowPagination = list.length > 0 || currentPage > 1;

  return (
    <div className="search container">
      <SearchForm
        searchResults={searchResults}
        onFormSubmit={onSearchSubmit}
        categories={categories}
      />
      <div className="container">
        {searchResults.length !== 0 ? (
          <div className="row">
            {searchResults.map((search) => (
              <div className="col-4" key={search.id}>
                <Card book={search} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="row">
              {list.map((book) => (
                <div key={book.id} className="col-4">
                  <Card book={book} />
                </div>
              ))}
            </div>
            {shouldShowPagination && (
              <div className="pagination">
                <button
                  onClick={handlePrevious}
                  disabled={!pagination.previous}
                >
                  <ArrowBackIcon />
                </button>
                <p>{currentPage}</p>
                <button onClick={handleNext} disabled={!pagination.next}>
                  <ArrowForwardIcon />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Book;
