import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/redux";
import { getSettingsObject, useSettings } from "../../slice/settings";
const HeaderBottom = () => {
  const dispatch = useAppDispatch();
  const { list: settings, item: item } = useSettings();
  useEffect(() => {
    dispatch(getSettingsObject());
  }, []);
  const [burger, setBurger] = useState(false);
  return (
    <div className="header__bottom container">
      <img className="header__bottom-img" src={item?.logo} alt="" />
      <nav className="header__nav">
        <ul className={burger ? "header__menu active" : "header__menu"}>
          <li className="header__menu-link">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/category"}>Категории</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/books"}>Книги</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/new"}>Новые книги</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/contact"}>Контакт</NavLink>
          </li>
        </ul>
        <button
          className="header__bottom-burger"
          onClick={() => setBurger(!burger)}
        >
          {burger ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
      <img src={""} alt="" />
    </div>
  );
};

export default HeaderBottom;
