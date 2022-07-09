/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CheckListContext } from "../pages/HomePages/cart/Cart";
import { dangKyKhoaHocAction } from "../redux/actions/types/QuanLyKhoaHocAction";
import { tongGiaTien, xoaSanPham } from "../redux/reducers/cartReducer";

const Receipt = ({ Pay }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isCheckContext = useContext(CheckListContext);
  const { totalPrice, promotionAmount, currentItem } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );
  const { userValue } = useSelector((rootReducer) => rootReducer.userReducer);

  const [nextStep, setNextStep] = useState(false);
  let itemSelected = [{ giaTien: 0 }];
  if (isCheckContext?.isChecked) {
    itemSelected = isCheckContext.isChecked.map((item, index) => {
      return { maKhoaHoc: item, giaTien: 999000 };
    });
  }

  let total = itemSelected.reduce((total, item) => {
    let result = total + item.giaTien;
    return Math.ceil(result);
  }, 0);
  let promotion = 1000 * isCheckContext?.isChecked.length;
  let currentCart = isCheckContext?.isChecked;

  useEffect(() => {}, [isCheckContext?.isChecked]);
  return (
    <>
      {totalPrice > 0 && Pay ? (
        <div className="order">
          <div className="order__wrapper">
            <h2>Hóa đơn</h2>
            <li>
              <span>Giá chưa Giảm</span>
              <span>{totalPrice.toLocaleString()} vnđ</span>
            </li>
            <hr />
            <li className="total">
              <span>Tổng Cộng</span>
              <span>
                {totalPrice > 0
                  ? (totalPrice - promotionAmount).toLocaleString()
                  : 0}
                vnđ
              </span>
            </li>
            <hr />
            {nextStep ? (
              <button onClick={() => {}} disabled={total > 0 ? false : true}>
                Thanh toán
              </button>
            ) : (
              <button
                onClick={async () => {
                  const userName = userValue.taiKhoan;

                  currentItem.forEach((item) => {
                    dispatch(
                      dangKyKhoaHocAction({
                        maKhoaHoc: item,
                        taiKhoan: userName,
                      })
                    );
                    dispatch(
                      xoaSanPham({
                        maKhoaHoc: item,
                        taiKhoan: userName,
                      })
                    );
                  });
                  history.push("/home/user");
                }}
                disabled={totalPrice > 0 ? false : true}
              >
                {Pay ? "Thanh Toán" : "Tiếp theo"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="order">
          <div className="order__wrapper">
            <h2>Hóa đơn</h2>
            <li>
              <span>Giá chưa Giảm</span>
              <span>{total.toLocaleString()} vnđ</span>
            </li>
            <hr />
            <li>
              <span>Giảm giá</span>
              <span>
                {isCheckContext?.isChecked
                  ? promotion.toLocaleString()
                  : "1,000 "}
                vnđ
              </span>
            </li>
            <hr />

            <li className="total">
              <span>Tổng Cộng</span>
              <span>
                {total > 1000 ? (total - 1000).toLocaleString() : 0} vnđ
              </span>
            </li>
            <hr />
            {nextStep ? (
              <button onClick={() => {}} disabled={total > 0 ? false : true}>
                Thanh toán
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(
                    tongGiaTien({
                      total,
                      promotion,
                      currentCart,
                    })
                  );
                  console.log(currentCart);
                  setNextStep(true);
                  history.push("/checkout");
                }}
                disabled={total > 0 ? false : true}
              >
                {Pay ? "Thanh Toán" : "Tiếp theo"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Receipt;
