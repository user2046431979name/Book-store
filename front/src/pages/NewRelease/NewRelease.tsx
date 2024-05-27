import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { getBooks, selectBooksCreatedAfterYesterday } from "../../slice/book";
import Card from "../../components/Card/Card";

const NewRelease = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooksCreatedAfterYesterday);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <section>
      <div className="row">
        {books.map((book) => {
          return <Card book={book} key={book.id} title={"col-4"} />;
        })}
      </div>
    </section>
  );
};

export default NewRelease;
