import React, { ChangeEvent, FormEvent, useState } from "react";
import { Book, Category, SearchBook } from "../../type";
import searchSvg from "../../assets/Form/Search.svg";
import Select from "./Select";
interface Props {
  searchResults: Book[];
  categories: Category[];
  onFormSubmit: (state: SearchBook) => void;
}

const SearchForm: React.FC<Props> = ({
  searchResults,
  categories,
  onFormSubmit,
}) => {
  const [state, setState] = useState<SearchBook>({
    title: "",
    category_id: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(state);
    setState({
      title: "",
      category_id: "",
    });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <Select
          onChange={onChange}
          onSubmit={onSubmit}
          searchResults={searchResults}
          categories={categories}
        />
        <div className="form__row">
          <input
            onChange={onChange}
            name="title"
            className="form__row-input"
            value={state.title}
            type="text"
            // required
          />
          <button type="submit" className="form__row-btn">
            <img src={searchSvg} alt="" />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
