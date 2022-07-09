/** @format */

import { Breadcrumb, Button, message, Space } from "antd";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../../components/CourseCard";
import {
  CapNhatThongTinAction,
  ThongTinTaiKhoanAction,
} from "../../../redux/actions/types/QuanLyNguoiDungAction";

function UserInfo() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState({
    panel1: false,
    panel2: true,
  });

  const { userValue, successMessage } = useSelector((rootReducer) => {
    return rootReducer.userReducer;
  });
  useEffect(() => {
    dispatch(ThongTinTaiKhoanAction());
  }, []);
  return (
    <div className="user__info__container">
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/home">Home</a>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <h1>Trang Cá Nhân và Cài Đặt</h1>
      <div className="user__info__container__overview">
        <div className="mutil__options">
          <button
            onClick={() => {
              setIsActive({
                panel1: true,
                panel2: false,
              });
            }}
          >
            Thông Tin cơ Bản
          </button>
          <button
            onClick={() => {
              setIsActive({
                panel1: false,
                panel2: true,
              });
            }}
          >
            Khóa học của tôi
          </button>
        </div>
        {isActive.panel1 && (
          <Panel1 userValue={userValue} successMessage={successMessage} />
        )}
        {isActive.panel2 && <Panel2 />}
      </div>
    </div>
  );
}

export default UserInfo;

const Panel1 = ({ userValue, successMessage }) => {
  const dispatch = useDispatch();
  const success = () => {
    message.success(successMessage);
  };
  const [valueEdit, setValueEdit] = useState({
    taiKhoan: userValue.taiKhoan,
    matKhau: userValue?.matKhau,
    hoTen: userValue.hoTen,
    soDT: userValue.soDT,
    maLoaiNguoiDung: userValue.maLoaiNguoiDung,
    maNhom: userValue.maNhom,
    email: userValue.email,
  });
  console.log(valueEdit);
  useEffect(() => {
    gsap.from(".pannel1", {
      x: "-100%",
      duration: 0.3,
      ease: "power3.easeInOut",
    });
  }, []);
  return (
    <div className="pannel1">
      <div className="item">
        <h3>Họ Tên</h3>
        <input
          value={valueEdit.hoTen}
          onChange={({ target }) => {
            let { value, name } = target;
            setValueEdit({ ...valueEdit, [name]: value });
          }}
          name="hoTen"
        />
      </div>
      <div className="item">
        <h3>Số Điện Thoại</h3>
        <input
          value={valueEdit.soDT}
          onChange={({ target }) => {
            let { value, name } = target;
            setValueEdit({ ...valueEdit, [name]: value });
          }}
          name="soDT"
        />
      </div>

      <div className="item">
        <h3>Email</h3>
        <input
          value={valueEdit.email}
          onChange={({ target }) => {
            let { value, name } = target;
            setValueEdit({ ...valueEdit, [name]: value });
          }}
          name="email"
        />
      </div>
      <div className="item">
        <Space>
          <Button
            onClick={async () => {
              dispatch(CapNhatThongTinAction(valueEdit));
              success();
            }}
          >
            Cập Nhật Thông Tin
          </Button>
        </Space>
      </div>
    </div>
  );
};
const Panel2 = () => {
  const { userValue } = useSelector((rootReducer) => rootReducer.userReducer);
  useEffect(() => {
    gsap.from(".pannel2", {
      x: "200%",
      duration: 0.3,
      ease: "power3.easeInOut",
    });
  }, []);
  return (
    <div className="pannel2">
      <div className="courses__list">
        <CourseCard
          courseArray={userValue.chiTietKhoaHocGhiDanh}
          hasBought={true}
        />
      </div>
    </div>
  );
};
