import { NavLink } from "react-router-dom";
import logo from "../../assets/Header/image.png";
import like from "../../assets/Header/like.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
const HeaderBottom = () => {
  const [burger, setBurder] = useState(false);
  return (
    <div className="header__bottom container">
      <img className="header__bottom-img" src={logo} alt="" />
      <nav className="header__nav">
        <ul className={burger ? "header__menu active" : "header__menu"}>
          <li className="header__menu-link">
            <NavLink to={"/"}>home</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/about"}>about us</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/books"}>books</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/new"}>new release</NavLink>
          </li>
          <li className="header__menu-link">
            <NavLink to={"/contact"}>contact us</NavLink>
          </li>
        </ul>
        <button
          className="header__bottom-burger"
          onClick={() => setBurder(!burger)}
        >
          {burger ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
      <img src={""} alt="" />
    </div>
  );
};

export default HeaderBottom;
