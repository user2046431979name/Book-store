import phone from "../../assets/Header/phone.svg";
import facebook from "../../assets/Header/facebook.svg";
import instagram from "../../assets/Header/instagram.svg";
import HeaderBottom from "./HeaderBottom";
const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="header__container container">
          <div className="header__top-number">
            <img src={phone} className="header__top-number-img" alt="" />
            <h3 className="header__top-number-tel">+91 8374902234</h3>
          </div>
          <div className="header__top-links">
            <a href="#">
              <img src={facebook} alt="" className="header__top-links-img" />
            </a>
            <a href="#">
              <img src={instagram} alt="" className="header__top-links-img" />
            </a>
          </div>
        </div>
      </div>
      <HeaderBottom />
    </header>
  );
};

export default Header;
