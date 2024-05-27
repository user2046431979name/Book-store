import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { getCategories, selectCategories } from "../../slice/category";

const Categories = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
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
              <div className="col-4" key={category.id}>
                <div className="category__content">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="category__content-img"
                  />
                  <h3 className="category__content-title">{category.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <button className="category__btn">view more</button>
      </div>
    </section>
  );
};

export default Categories;
