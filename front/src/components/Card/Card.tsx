import React from "react";
import { Book } from "../../type";
interface Props {
  book: Book;
  title?: string;
}
const Card: React.FC<Props> = ({ book, title }) => {
  return (
    <div className={`new__content ${title}`}>
      <div className="new__content-img">
        <img src={book.image} alt="" />
      </div>
      <h3 className="new__content-title">{book.title}</h3>
      <p className="new__content-author">{book.author}</p>
      <b className="new__content-price">{book.price} KGS</b>
    </div>
  );
};

export default Card;
