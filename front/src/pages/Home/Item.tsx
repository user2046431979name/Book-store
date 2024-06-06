import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAppDispatch } from "../../app/redux";
import { getBooks, useBooks } from "../../slice/book";
import { Link } from "react-router-dom";
const Item = () => {
  const dispatch = useAppDispatch();
  const { list: books } = useBooks();

  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  return (
    <section className="item">
      <div className="container">
        <Slider {...settings}>
          {books.map((book) => {
            return (
              <div key={book.id}>
                <div className="row">
                  <div className="col-6">
                    <img className="item__img" src={book.image} alt="" />
                  </div>
                  <div className="col-6">
                    <div className="item__content">
                      <h2 className="item__content-title">{book.title}</h2>
                      <span className="item__content-line"></span>
                      <p className="item__content-author">{book.author}</p>
                      <p className="item__content-text">
                        {" "}
                        {book.description.trim().length > 150
                          ? book.description.substr(0, 150) + "..."
                          : book.description}
                      </p>
                      <b className="item__content-price">$ {book.price}</b>
                      <Link
                        to={`/book/${book.id}`}
                        className="item__content-btn"
                      >
                        узнать больше
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Item;
