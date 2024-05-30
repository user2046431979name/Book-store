import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAppDispatch } from "../../app/redux";
import Card from "../../components/Card/Card";
import { getBooks, useBooks } from "../../slice/book";
const New = () => {
  const dispatch = useAppDispatch();
  const { list: books } = useBooks();

  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <section className="new">
      <h2 className="new__title">New Release Books</h2>
      <Slider {...settings}>
        {books.map((book) => {
          return <Card key={book.id} book={book} />;
        })}
      </Slider>
    </section>
  );
};

export default New;
