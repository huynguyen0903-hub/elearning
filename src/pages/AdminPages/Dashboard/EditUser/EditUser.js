/** @format */

import React, { useState } from "react";
import { Button, Form, Input, message, Radio, Space } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { capNhatThongTinNguoiDungAction } from "../../../../redux/actions/types/QuanLyNguoiDungAction";

const EditUser = (props) => {
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const { userEdit, updateMessage, updateStatus } = useSelector(
    (rootReducer) => rootReducer.adminReducer
  );
  const HandleMessage = () => {
    if (updateStatus === true) {
      message.success(updateMessage);
    } else {
      message.error(updateMessage);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userEdit?.taiKhoan,
      matKhau: userEdit?.matKhau,
      hoTen: userEdit?.hoTen,
      email: userEdit?.email,
      soDt: userEdit?.soDt,
      maLoaiNguoiDung: userEdit?.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
      dispatch(capNhatThongTinNguoiDungAction(values));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3 className="text-center">Thêm mới nguời dùng</h3>
      <br />
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tài khoản">
        <Input
          disabled
          name="taiKhoan"
          style={{ width: 250 }}
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
        />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input
          name="matKhau"
          style={{ width: 250 }}
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />
      </Form.Item>
      <Form.Item label="Họ tên">
        <Input
          name="hoTen"
          style={{ width: 250 }}
          onChange={formik.handleChange}
          value={formik.values.hoTen}
        />
      </Form.Item>

      <Form.Item label="Email">
        <Input
          name="email"
          style={{ width: 250 }}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input
          name="soDt"
          style={{ width: 250 }}
          onChange={formik.handleChange}
          value={formik.values.soDt}
        />
      </Form.Item>
      <Form.Item label="Mã loại người dùng">
        <Input
          name="maLoaiNguoiDung"
          style={{ width: 250 }}
          onChange={formik.handleChange}
          value={formik.values.maLoaiNguoiDung}
        />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <Space>
          <Button
            onClick={() => {
              formik.handleSubmit();
              HandleMessage();
            }}
            className=" p-2"
          >
            Cập nhật
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default EditUser;
