import React from "react";
import instagram from "../../assets/Footer/instagram.svg";
import logo from "../../assets/Footer/logo.svg";
const Footer = () => {
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
                <a href="#">
                  <img src={instagram} alt="" />
                </a>
                <a href="#">
                  <img src={instagram} alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-4">
            <ul className="footer__menu">
              <h3 className="footer__menu-title">Company</h3>
              <li className="footer__menu-link">HOME</li>
              <li className="footer__menu-link">ABOUT US</li>
              <li className="footer__menu-link">BOOKS</li>
              <li className="footer__menu-link">NEW RELEASE</li>
              <li className="footer__menu-link">CONTACT US</li>
              <li className="footer__menu-link">BLOG</li>
            </ul>
          </div>
          <div className="col-4">
            <ul className="footer__menu">
              <h3 className="footer__menu-title">Importent Links</h3>
              <li className="footer__menu-link">Privacy Policy</li>
              <li className="footer__menu-link">FAQs</li>
              <li className="footer__menu-link">Terms of Service</li>
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
