import React from "react";
import app from "../../../assets/images/App.png";
import "./_Footer.scss"
function Footer() {
  return (
    <div className="footer__container">
      <div className="about">
        <h3>Về Chúng Tôi</h3>
        <span>Điều khoản</span>
        <span>Chính sách bảo mật</span>
      </div>
      <div className="community">
        <h3>CỘNG ĐỒNG</h3>
        <span>Chăm sóc khách hàng</span>
        <span>Blog</span>
        <span>Danh Mục</span>
      </div>
      <div className="address">
        <h3>Địa CHỉ</h3>
        <span>Ho CHi Minh, Viet Nam</span>
        <span>Email: vnhuynguyenhieu@gmail.com</span>
      </div>
      <div className="app">
        <h3>Tải Về Tại</h3>
        <img src={app} alt="..." />
      </div>
    </div>
  );
}

export default Footer;
