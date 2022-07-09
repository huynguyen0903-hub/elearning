/** @format */

import { Breadcrumb } from "antd";
import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
import Receipt from "../../../components/Receipt";
import { useHistory } from "react-router-dom";
import CartItems from "./CartItems";
export const CheckListContext = createContext();
const CartUser = () => {
  const history = useHistory();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isChecked, setIsCheck] = useState([]);
  const { thongTinGioHang } = useSelector((rootReducer) => {
    return rootReducer.cartReducer;
  });

  return (
    <CheckListContext.Provider
      value={{
        isChecked,
        setIsCheck,
        isCheckAll,
        setIsCheckAll,
      }}
    >
      <div className="cartUser__container">
        <div className="cart__items">
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item
                onClick={() => {
                  history.push("/home");
                }}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={() => {
                  history.push(`/details/allcourses`);
                }}
              >
                Danh Mục
              </Breadcrumb.Item>
              <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <h1>Giỏ Hàng</h1>
          <p>Bạn có {thongTinGioHang.length} sản phẩm trong giỏ hàng</p>
          <CartItems />
        </div>
        <div className="receipt">
          <Receipt Pay={false} />
        </div>
      </div>
    </CheckListContext.Provider>
  );
};

export default CartUser;
