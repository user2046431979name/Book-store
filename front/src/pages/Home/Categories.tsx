import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { getCategories, useCategories } from "../../slice/category";
import CardCategory from "../../components/CardCategory/CardCategory";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const Categories = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useCategories();
  // const categories = useAppSelector(selectCategories);
  useEffect(() => {
    dispatch(getCategories());
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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
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
    <section className="category">
      <div className="container">
        <h2 className="category__title">Топ категории</h2>
        <Slider {...settings}>
          {categories.map((category) => {
            return <CardCategory key={category.id} category={category} />;
          })}
        </Slider>
        <button>
          <Link to={"/category"} className="category__btn">
            больше
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Categories;
