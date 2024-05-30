import { NavLink } from "react-router-dom";
import logo from "../../assets/Header/image.png";
import like from "../../assets/Header/like.svg";

const HeaderBottom = () => {
  return (
    <div className="header__bottom container">
      <img className="header__bottom-img" src={logo} alt="" />
      <nav className="header__nav">
        <ul className="header__menu">
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
      </nav>
      <img src={like} alt="" />
    </div>
  );
};

export default HeaderBottom;
