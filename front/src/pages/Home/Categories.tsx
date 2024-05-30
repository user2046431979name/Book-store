import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { getCategories, useCategories } from "../../slice/category";
import CardCategory from "../../components/CardCategory/CardCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useCategories();
  // const categories = useAppSelector(selectCategories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <section className="category">
      <div className="container">
        <h2 className="category__title">Explore our Top Categories</h2>
        <div className="row">
          {categories.map((category) => {
            return (
              <CardCategory
                key={category.id}
                category={category}
                title="col-4"
              />
            );
          })}
        </div>
        <Link to={"/category"} className="category__btn">
          view more
        </Link>
      </div>
    </section>
  );
};

export default Categories;
