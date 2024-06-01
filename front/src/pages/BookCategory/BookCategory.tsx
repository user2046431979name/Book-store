import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/redux";
import {
  getCategoryItem,
  getNextCategories,
  getPreviousCategories,
  useCategories,
} from "../../slice/category";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import {
  getBooksByPage,
  getNextBooks,
  getPreviousBooks,
} from "../../slice/book";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const BookCategory = () => {
  const dispatch = useAppDispatch();
  // const { item: book } = useCategories();
  // const {list: category} = useCategories
  const { item, pagination, currentPage, totalPages } = useCategories();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(getCategoryItem(id));
  }, []);
  // console.log(book);
  const handleNext = () => {
    if (pagination.next) {
      dispatch(getNextCategories(pagination.next));
    }
  };

  const handlePrevious = () => {
    if (pagination.previous) {
      dispatch(getPreviousCategories(pagination.previous));
    }
  };

  const handlePageClick = (page: number) => {
    dispatch(getBooksByPage(page));
  };
  return (
    <section className="categories">
      <div className="container">
        <div className="row">
          {item.map((item) => {
            return <Card book={item} key={item.id} title="col-4" />;
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

export default BookCategory;
