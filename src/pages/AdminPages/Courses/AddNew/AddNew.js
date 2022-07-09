/** @format */

import { DatePicker, Form, Input, InputNumber, Radio, Select } from "antd";
import React, { useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Option } from "antd/lib/mentions";
import { USER_LOGIN } from "../../../../ulti/setting";
import { themKhoaHocUploadHinhAction } from "../../../../redux/actions/types/QuanLyKhoaHocAction";
const AddNew = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(USER_LOGIN));
  let formData = new FormData();

  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      ngayTao: "",
      maDanhMucKhoahoc: "TuDuy",
    },

    onSubmit: (values) => {
      //Tạo đối tượng formdata
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        }
      }
      formData.append("File", values["hinhAnh"]);
      formData.append("taiKhoanNguoiTao", user.taiKhoan);
      formData.append("maNhom", user.maNhom);
      //Gọi api gửi các gia trị formdata về backend xử lý
      dispatch(themKhoaHocUploadHinhAction(formData));
    },
  });
  console.log("formik.values", formik.values);

  const handleChangeDatePicker = (value) => {
    let ngayTao = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayTao", ngayTao);
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //tạo đôi tượng để đọc file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImgSrc(e.target.result);
      };
      //đem dữ liệu file lưu vào formik
      formik.setFieldValue("hinhAnh", file);
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
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
        <h3>Thêm mới khóa học</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Mã khóa học">
          <Input
            style={{ width: 160 }}
            name="maKhoaHoc"
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Tên khóa học">
          <Input
            style={{ width: 360 }}
            name="tenKhoaHoc"
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input.TextArea name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Lượt xem">
          <InputNumber onChange={handleChangeInputNumber("luotXem")} />
        </Form.Item>
        <Form.Item label="Mã nhóm">
          <Input style={{ width: 160 }} value={user.maNhom} disabled />
        </Form.Item>
        <Form.Item label="Ngày tạo">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>

        <Form.Item label="Mã danh mục khóa học">
          <Select
            defaultValue="TuDuy"
            style={{
              width: 120,
            }}
            name="maDanhMucKhoahoc"
            onChange={(value) => {
              formik.setFieldValue("maDanhMucKhoahoc", value);
            }}
          >
            <Option value="TuDuy">Tư Duy</Option>
            <Option value="FrontEnd">FrontEnd</Option>
            <Option value="BackEnd">BackEnd</Option>
            <Option value="FullStack">FullStack</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tài khoản người tạo">
          <Input style={{ width: 360 }} value={user.taiKhoan} disabled />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg, image/gif, image/png"
          />
          <br />
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className=" p-2">
            Thêm mới
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew;
