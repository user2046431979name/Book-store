import React from "react";
import { Category } from "../../type";
import { title } from "process";

interface Props {
  category: Category;
  title?: string;
  children?: React.ReactNode;
}

const CardCategory: React.FC<Props> = ({ category, title, children }) => {
  return (
    <div className={title} key={category.id}>
      <div className="category__content">
        <img
          src={category.image}
          alt={category.title}
          className="category__content-img"
        />
        <h3 className="category__content-title title">{category.title}</h3>
        {children}
      </div>
    </div>
  );
};

export default CardCategory;
