import phone from "../../assets/Header/phone.svg";
import facebook from "../../assets/Header/facebook.svg";
import instagram from "../../assets/Header/instagram.svg";
import HeaderBottom from "./HeaderBottom";
import { useAppDispatch } from "../../app/redux";
import { getSettingsObject, useSettings } from "../../slice/settings";
import { useEffect } from "react";
const Header = () => {
  const dispatch = useAppDispatch();
  const { list: settings, item: item } = useSettings();
  useEffect(() => {
    dispatch(getSettingsObject());
  }, []);
  return (
    <header className="header">
      <div className="header__top">
        <div className="header__container container">
          <div className="header__top-number">
            <img src={phone} className="header__top-number-img" alt="" />
            <h3 className="header__top-number-tel">{item?.numberAdmin}</h3>
          </div>
          <div className="header__top-links">
            <a href={item?.facebook}>
              <img src={facebook} alt="" className="header__top-links-img" />
            </a>
            <a href={item?.instagram}>
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
