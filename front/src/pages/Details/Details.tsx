import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/redux";
import { getBookItem, useBooks } from "../../slice/book";

const Details = () => {
  const dispatch = useAppDispatch();
  const { item: book } = useBooks();

  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(getBookItem(id));
  }, []);
  
  return (
    <section className="detail">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img className="item__img" src={book?.image} alt="" />
          </div>
          <div className="col-6">
            <div className="item__content">
              <h2 className="item__content-title">{book?.title}</h2>
              <span className="item__content-line"></span>
              <p className="item__content-author">{book?.author}</p>
              <p className="item__content-text">{book?.description}</p>
              <b className="item__content-price">{book?.price} KGS</b>
              <button className="item__content-btn">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
