/** @format */

import { Breadcrumb, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Receipt from "../../../components/Receipt";

const Checkout = () => {
  const history = useHistory();
  const prefixSelector = (
    <Form.Item noStyle>
      <i className="fa-solid fa-star"></i>+84
    </Form.Item>
  );

  const MethodList = () => {
    const [isActive, setIsActive] = useState("");
    return (
      <>
        <Row>
          <Col span="md">
            <img
              className={`${isActive === "momo" ? "active" : ""}`}
              name="momo"
              onClick={(e) => {
                setIsActive(e.target.name);
              }}
              src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
              alt="..."
            />
          </Col>
          <Col span="md">
            <img
              className={`${isActive === "visa" ? "active" : ""}`}
              name="visa"
              onClick={(e) => {
                setIsActive(e.target.name);
              }}
              src="https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/5fe9c4a444d203002598b556"
              alt="..."
            />
          </Col>
          <Col span="md">
            <img
              className={`${isActive === "atm" ? "active" : ""}`}
              name="atm"
              onClick={(e) => {
                setIsActive(e.target.name);
              }}
              src="https://cdn2.topica.vn/5f9a7e51cb5acb5e85ce3010/product/621df7d47133c100271ad0e4"
              alt="..."
            />
          </Col>
          <Col span="md">
            <img
              className={`${isActive === "banking" ? "active" : ""}`}
              name="banking"
              onClick={(e) => {
                setIsActive(e.target.name);
              }}
              src="https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/6065515b9a780e002578d444"
              alt="..."
            />
          </Col>
          <Col span="md">
            <img
              className={`${isActive === "vnpay" ? "active" : ""}`}
              name="vnpay"
              onClick={(e) => {
                setIsActive(e.target.name);
              }}
              src="https://cdn2.topica.vn/22886f7c-607d-4e28-9443-7fc586c865c6/product/vnpay"
              alt="..."
            />
          </Col>
        </Row>
      </>
    );
  };
  return (
    <>
      <div className="checkout__container">
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <span
                onClick={() => {
                  history.push(`/cart`);
                }}
              >
                Giỏ hàng
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thanh Toán</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="order__info">
          <div className="info">
            <h1>Thanh Toán</h1>
            <div className="contact__info">
              <Form layout="vertical">
                <Form.Item label="Họ và tên:">
                  <Input placeholder="Nhập Họ và Tên" />
                </Form.Item>
                <Form.Item label="Email">
                  <Input placeholder="Nhập Email" />
                </Form.Item>
                <Form.Item>
                  <Input
                    addonBefore={prefixSelector}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="payment__method">
              <h1>Phương Thức Thanh Toán</h1>
              <div className="methods">
                <MethodList />
              </div>
            </div>
          </div>
          <div className="payment__receipt">
            <Receipt Pay={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
