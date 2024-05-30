import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import Card from "../../components/Card/Card";
import {
  getBooks,
  getBooksByPage,
  getNextBooks,
  getPreviousBooks,
  getSecondBooks,
  selectBooksCreatedAfterYesterday,
  useBooks,
} from "../../slice/book";

const NewRelease = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooksCreatedAfterYesterday);
  console.log(books);

  useEffect(() => {
    dispatch(getSecondBooks());
  }, []);

  const { list, pagination, currentPage, totalPages } = useBooks();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

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
    <section className="release">
      <div className="container">
        <h3 className="release__title">Новые книги</h3>
        <div className="row">
          {list.map((book) => {
            return <Card book={book} key={book.id} title={"col-4"} />;
          })}
        </div>
        {shouldShowPagination && (
          <div className="pagination">
            <button onClick={handlePrevious} disabled={!pagination.previous}>
              Previous
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={!pagination.next}>
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewRelease;
