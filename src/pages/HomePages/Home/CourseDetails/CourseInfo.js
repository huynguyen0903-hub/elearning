/** @format */

import { Breadcrumb, Col, Rate, Row } from "antd";
import React, { useContext, useEffect } from "react";
import { SmileOutlined, BookOutlined } from "@ant-design/icons";
import RowCourses from "../../../../components/RowCourses";
import gsap from "gsap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  layThongTinKhoaHocAction,
  loadThongTinKhoaHocAction,
} from "../../../../redux/actions/types/QuanLyKhoaHocAction";
import { CheckListContext } from "../../cart/Cart";
function CourseInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { courseName } = useParams();
  const handleAddCourse = (course) => {
    dispatch(layThongTinKhoaHocAction(course.maKhoaHoc));
  };
  const { courseInfo } = useSelector(
    (rootReducer) => rootReducer.courseReducer
  );
 
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(loadThongTinKhoaHocAction(courseName));
  }, [courseName]);
  return (
    <>
      {courseInfo && (
        <div className="courseInfo__container">
          <div className="header__background">
            <div className="left">
              <div className="breadcrumb">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <a href="/home">Home</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/details/allcourses">
                      {courseInfo.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{courseInfo.tenKhoaHoc}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h1 className="title">{courseInfo.tenKhoaHoc}</h1>
              <p>{courseInfo.moTa}</p>
              <Rate disabled defaultValue={5} />
              <span>{courseInfo.luotXem}</span>
            </div>
            <div className="right">
              <div className="course__papper">
                <div className="course__image">
                  <img src={courseInfo.hinhAnh} alt="..." />
                </div>
                <div className="course__content">
                  <span className="price">999,999 ??</span>
                  <button
                    onClick={(e) => {
                      let tl = gsap.timeline();
                      tl.to(".btnText", {
                        x: "100%",
                        duration: 0.2,
                      })
                        .to(".Added", {
                          left: "50%",
                          scale: 1.5,
                          duration: 0.1,
                        })
                        .to(".Added", {
                          scale: 1,
                          duration: 0.1,
                        });
                      handleAddCourse(courseInfo);
                    }}
                    className="btnAdd"
                  >
                    <p className="btnText">Th??m V??o Gi??? H??ng</p>
                    <p className="Added">Added</p>
                  </button>
                  <button
                    onClick={async () => {
                      handleAddCourse(courseInfo);
                      history.push(`/cart`);
                    }}
                    className="buyNow"
                  >
                   Xem gi??? h??ng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="feedback">
            <div className="title">
              <h1>????nh gi?? t??? h???c vi??n</h1>
            </div>
            <div className="feedback__content">
              <div className="feedback__left">
                <div className="rating">
                  <span className="star">4.6/5</span>
                  <Rate allowHalf disabled defaultValue={4.5} />
                  <span className="reviews">(11,224 ????nh gi??)</span>
                </div>
                <div className="feeling">
                  <span>
                    <SmileOutlined />
                    Gi???ng vi??n th??n thi???n, nhi???t t??nh
                  </span>
                  <span>
                    <BookOutlined />
                    T??i li???u chi ti???t, d??? hi???u
                  </span>
                </div>
              </div>
              <div className="feedback__right">
                <Row>
                  <Col span="md">
                    <div className="title">
                      Tr???n Anh Tu???n
                      <Rate allowHalf disabled defaultValue={4.5} />
                    </div>
                    <div className="text">
                      Gi??o tr??nh gi???ng d???y chi ti???t, c?? h?????ng d???n c??ng c??? ??i
                      k??m. Tuy nhi??n c???n th??m case study th???c t??? ????? d??? tham kh???o
                    </div>
                  </Col>
                  <Col span="md">
                    <div className="title">
                      Nguy???n Minh H???ng
                      <Rate allowHalf disabled defaultValue={4.5} />
                    </div>
                    <div className="text">
                      Gi???ng vi??n nhi???t t??nh, ch????ng tr??nh h???c ????n gi???n, d??? hi???u.
                      N???i dung r???t ????ng h???c
                    </div>
                  </Col>
                  <Col span="md">
                    <div className="title">
                      Tu???n Anh
                      <Rate allowHalf disabled defaultValue={4.5} />
                    </div>
                    <div className="text">
                      H??nh th???c gi???ng d???y d??? nghe, g???n g??i, c?? s??? l??i cu???n. n???i
                      dung th???c t??? h???u d???ng. C???m ??n Gi???ng vi??n v?? ?????i ng??
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <RowCourses />
          <RowCourses />
        </div>
      )}
    </>
  );
}

export default CourseInfo;
