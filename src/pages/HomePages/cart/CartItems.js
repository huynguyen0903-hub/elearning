/** @format */
import React, { useContext } from "react";

import { Checkbox } from "antd";
import { CheckListContext } from "./Cart";
import { useSelector } from "react-redux";
import Item from "./Item";

const CartItems = () => {
  const { thongTinGioHang } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );
  const { isCheckAll, isChecked, setIsCheckAll, setIsCheck } =
    useContext(CheckListContext);
  return (
    <>
      <div className="cartItems__container">
        <div className="selectAll">
          <Checkbox
            checked={isCheckAll}
            onChange={() => {
              setIsCheckAll(!isCheckAll);
              setIsCheck(
                thongTinGioHang.map((item, index) => {
                  return item.maKhoaHoc;
                })
              );
              if (isCheckAll) {
                setIsCheck([]);
              }
            }}
          >
            Chọn Tất cả
          </Checkbox>
          ({isChecked.length})
        </div>
        <div className="cartItems__list">
          <Item />
        </div>
      </div>
    </>
  );
};
export default CartItems;
