import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import Card from "../../components/Card/Card";
import {
  getBooks,
  selectBooksCreatedAfterYesterday,
  useBooks,
} from "../../slice/book";
const New = () => {
  const dispatch = useAppDispatch();
  const { list: books } = useBooks();
  const news = useAppSelector(selectBooksCreatedAfterYesterday);
  let list = news.length === 0 ? books : news;

  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="new">
      <h2 className="new__title">New Release Books</h2>
      <Slider {...settings}>
        {list.map((book) => {
          return <Card key={book.id} book={book} />;
        })}
      </Slider>
    </section>
  );
};

export default New;
