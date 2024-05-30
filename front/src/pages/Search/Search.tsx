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
import { getCategories, selectCategories } from "../../slice/category";
import { selectSearchs, setSearch } from "../../slice/search";
import { SearchBook } from "../../type";
import SearchForm from "./SearchForm";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const searchResults = useAppSelector(selectSearchs);
  const { list, loading, pagination, currentPage, totalPages } = useBooks();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
  }, []);

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
  console.log(totalPages);
  const shouldShowPagination = list.length >= 9 || currentPage > 1;
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
            {searchResults.map((search) => {
              return (
                <div className="col-4" key={search.id}>
                  <Card book={search} />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="row">
              {list.map((book) => {
                return (
                  <div key={book.id} className="col-4">
                    <Card book={book} />
                  </div>
                );
              })}
            </div>
            {shouldShowPagination && (
              <div>
                <button
                  onClick={handlePrevious}
                  disabled={!pagination.previous}
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button onClick={handleNext} disabled={!pagination.next}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
