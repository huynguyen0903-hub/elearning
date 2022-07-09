/** @format */

import React, { useContext } from "react";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import { xoaSanPham } from "../../../redux/reducers/cartReducer";
import { CheckListContext } from "./Cart";

const Item = () => {
  const { isChecked, setIsCheck } = useContext(CheckListContext);
  const { thongTinGioHang } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );
  const dispatch = useDispatch();
  return thongTinGioHang.map((item, index) => (
    <div key={index} className="item">
      <Checkbox
        checked={isChecked.includes(item.maKhoaHoc)}
        key={index}
        id={item.maKhoaHoc}
        onChange={({ target }) => {
          let { id, checked } = target;
          setIsCheck([...isChecked, id]);
          if (!checked) {
            setIsCheck(isChecked.filter((item) => item !== id));
          }
        }}
      ></Checkbox>
      <div className="item__info">
        <div className="item__image">
          <img src="https://picsum.photos/150/150?random=1" alt="..." />
        </div>
        <div className="item__details">
          <div className="name">
            <span>{item.tenKhoaHoc}</span>
            <CloseCircleOutlined
              onClick={async () => {
                setIsCheck(
                  isChecked.filter(
                    (itemChecked) => itemChecked !== item.maKhoaHoc
                  )
                );
                dispatch(xoaSanPham(item.maKhoaHoc));
              }}
            />
          </div>
          <div className="topic">{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</div>
          <div className="pricing">
            <span className="original__price">1,000,000 đ</span>
            <span className="price">999,000 đ</span>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default Item;
