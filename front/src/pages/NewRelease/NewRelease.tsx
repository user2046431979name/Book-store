import { useEffect } from "react";
import { useAppDispatch } from "../../app/redux";
import Card from "../../components/Card/Card";
import {
  getBooks,
  getBooksByPage,
  getNextBooks,
  getPreviousBooks,
} from "../../slice/book";
import { getNewBooks, useNewBooks } from "../../slice/newBook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const NewRelease = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewBooks());
  }, []);

  const { list, pagination, currentPage, totalPages } = useNewBooks();
  // let reverseList = list.reverse();

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
              <ArrowBackIcon />
            </button>
            <p>{currentPage}</p>
            <button onClick={handleNext} disabled={!pagination.next}>
              <ArrowForwardIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewRelease;
