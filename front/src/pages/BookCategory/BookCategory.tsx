import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/redux";
import { getCategoryItem, useCategories } from "../../slice/category";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";

const BookCategory = () => {
  const dispatch = useAppDispatch();
  const { item: book, list: category } = useCategories();
  // const {list: category} = useCategories

  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(getCategoryItem(id));
  }, []);
  console.log(book);

  return (
    <section className="categories">
      <div className="container">
        <div className="row">
          {book.map((item) => {
            return (
              <Card
                book={item}
                key={item.id}
                title="col-4"
                http="http://127.0.0.1:8000/"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookCategory;
