import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/redux";
import CardCategory from "../../components/CardCategory/CardCategory";
import { getCategories, useCategories } from "../../slice/category";

const Category = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useCategories();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <section className="categories">
      <div className="container">
        <h2 className="release__title">категории</h2>
        <div className="row">
          {categories.map((category) => {
            return (
              <CardCategory category={category} title="col-4" key={category.id}>
                <button className="button">
                  <Link
                    to={`/category/${category.id}`}
                    className="category__btn"
                  >
                    Подробнее
                  </Link>
                </button>
              </CardCategory>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
