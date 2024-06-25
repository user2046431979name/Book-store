import React, {ChangeEvent, useEffect, useState} from "react";
import searchSvg from "../../assets/Form/Search.svg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {getCategories, useCategories} from "../../slice/category";
import {useAppDispatch} from "../../app/redux";
import {doSearch} from "../../slice/search";
import {useDebounce} from "../../hooks/useDebounce";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useCategories();
  const {0: searchParams, 1: setSearchParams} = useState({title: '', category_id: ''})

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(doSearch(searchParams))
  }, [dispatch, searchParams]);

  const onCategoryChange = (category_id: string) => {
    setSearchParams(prev => ({
      ...prev,
      category_id
    }));
  }

  const onTitleChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({
      ...prev,
      title: e.target.value,
    }));
  });

  return (
    <>
      <form className="form">
        <div>
          <Autocomplete
            onChange={(_event, newValue) => {
              newValue && onCategoryChange(String(newValue.id))
            }}
            options={categories}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{width: 200}}
            renderInput={(params) => <TextField {...params} label="Категории"/>}
          />
        </div>
        <div className="form__row">
          <input
            onChange={onTitleChange}
            name="title"
            className="form__row-input"
            type="text"
          />
          <button type="submit" className="form__row-btn">
            <img src={searchSvg} alt=""/>
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
