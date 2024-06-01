import React, { useEffect } from "react";
import logo from "../../assets/Footer/logo.svg";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/redux";
import { getSettingsObject, useSettings } from "../../slice/settings";
import facebook from "../../assets/Header/facebook.svg";
import instagram from "../../assets/Header/instagram.svg";
const Footer = () => {
  const dispatch = useAppDispatch();
  const { list: settings, item: item } = useSettings();
  useEffect(() => {
    dispatch(getSettingsObject());
  }, []);
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="footer__content">
              <img src={logo} alt="" />
              <p className="footer__content-text">
                Nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.{" "}
              </p>
              <div>
                <a href={item?.instagram}>
                  <img src={instagram} alt="" />
                </a>
                <a href={item?.facebook}>
                  <img src={facebook} alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-4">
            <ul className="footer__menu">
              <h3 className="footer__menu-title">Company</h3>
              <li className="footer__menu-link">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="footer__menu-link">
                <NavLink to={"/category"}>Категории</NavLink>
              </li>
              <li className="footer__menu-link">
                <NavLink to={"/books"}>Книги</NavLink>
              </li>
              <li className="footer__menu-link">
                <NavLink to={"/new"}>Новые книги</NavLink>
              </li>
              <li className="footer__menu-link">
                <NavLink to={"/contact"}>Контакт</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__bottom-text">
            Copyright Coderun 2024 Все права защищены
          </p>
          <b className="footer__bottom-bold">Privacy | Terms of Service</b>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
