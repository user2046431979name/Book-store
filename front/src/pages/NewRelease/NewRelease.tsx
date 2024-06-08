import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/redux";
import Card from "../../components/Card/Card";
import { getNextBooks, getPreviousBooks } from "../../slice/book";
import { getNewBooks, useNewBooks } from "../../slice/newBook";
const NewRelease = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewBooks());
  }, [dispatch]);

  const { list, pagination, currentPage } = useNewBooks();
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
  return (
    <section className="release">
      <div className="container">
        <h3 className="release__title">Новые книги</h3>
        <div className="row">
          {list.map((book) => {
            return <Card book={book} key={book.id} title={"col-4"} />;
          })}
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
    </section>
  );
};

export default NewRelease;
