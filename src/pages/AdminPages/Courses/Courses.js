/** @format */

import React from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  layDanhSachKhoaHocAction,
  xoaKhoaHocAction,
} from "../../../redux/actions/types/QuanLyKhoaHocAction";
const { Search } = Input;

export default function Courses(props) {
  const { courseArray } = useSelector(
    (rootReducer) => rootReducer.courseReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachKhoaHocAction());
  }, []);

  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      value: (text, object) => {
        return <span>(text)</span>;
      },

      sorter: (a, b) => a.maKhoaHoc.length - b.maKhoaHoc.length,
      sortDirections: ["descend"],
      width: "15%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, course, index) => {
        return (
          <>
            <img
              src={course.hinhAnh}
              alt={course.tenKhoaHoc}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </>
        );
      },
      width: "15%",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      sorter: (a, b) => {
        let tenKhoaHocA = a.tenKhoaHoc.toLowerCase().trim();
        let tenKhoaHocB = b.tenKhoaHoc.toLowerCase().trim();
        if (tenKhoaHocA > tenKhoaHocB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();
        if (moTaA > moTaB) {
          return 1;
        }
        return -1;
      },
      render: (text, course) => {
        return (
          <>
            {course.moTa.length > 50
              ? course.moTa.substr(0, 50) + "..."
              : course.moTa}
          </>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Hành động",
      dataIndex: "maKhoaHoc",

      render: (text, course) => {
        return (
          <>
            <NavLink
              key={1}
              className="mr-2"
              to={`/admin/courses/edit/${course.maKhoaHoc}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              onClick={() => {
                if (
                  window.confirm("Bạn có chắc muốn xóa " + course.tenKhoaHoc)
                ) {
                  //Gọi action
                  dispatch(xoaKhoaHocAction(course.maKhoaHoc));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
  ];

  const data = courseArray;

  const onSearch = (value) => {
    console.log(value);

    //Gọi api layDanhSachKhoaHoc
    dispatch(layDanhSachKhoaHocAction(value));
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <h2 className="text 4-xl text-center">Quản lý khóa học</h2>
      <Button
        className="mb-3"
        onClick={() => {
          props.history.push("/admin/courses/addnew");
        }}
      >
        Thêm khóa học
      </Button>
      <Search placeholder=" Tìm kiếm" size="large" onSearch={onSearch} />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maKhoaHoc"}
      />
    </div>
  );
}
