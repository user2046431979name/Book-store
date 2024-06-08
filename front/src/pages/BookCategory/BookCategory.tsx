import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/redux";
import Card from "../../components/Card/Card";

import {
  getCategoryItem,
  getNextCategories,
  getPreviousCategories,
  useCategories,
} from "../../slice/category";
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
