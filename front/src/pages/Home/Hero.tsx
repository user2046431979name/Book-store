import { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAppDispatch } from "../../app/redux";
import { getBooks, useBooks } from "../../slice/book";
const Hero = () => {
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
          dots: false,
          arrows: false,
          // slickPrev: false,
        },
      },
    ],
  };
  return (
    <section className="hero">
      <div className="container">
        <Slider {...settings}>
          {books.map((book) => {
            return (
              <div key={book.id}>
                <div className="row">
                  <div className="col-6">
                    <div className="hero__content">
                      <h3 className="hero__content-title">{book.title}</h3>
                      <p className="hero__content-text">
                        {book.description.trim().length > 150
                          ? book.description.substr(0, 150) + "..."
                          : book.description}
                      </p>
                      <Link
                        to={`/book/${book.id}`}
                        className="hero__content-btn"
                        type="submit"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                  <div className="col-6">
                    <img className="hero__img" src={book.image} alt="" />
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

export default Hero;
