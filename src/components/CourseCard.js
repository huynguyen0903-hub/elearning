/** @format */

import React from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinKhoaHocAction } from "../redux/actions/types/QuanLyKhoaHocAction";

function CourseCard({ category, courseArray, hasBought }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleAddCourse = (course) => {
    dispatch(layThongTinKhoaHocAction(course.maKhoaHoc));
  };
  const { userValue } = useSelector((rootReducer) => rootReducer.userReducer);
  const handleClickCourse = (maKhoaHoc) => {
    history.push(`/details/${category}/${maKhoaHoc}`);
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        {courseArray.map((course, index) => {
          let isBought = userValue.chiTietKhoaHocGhiDanh.some((item) => {
            return item.maKhoaHoc === course.maKhoaHoc ? true : false;
          });
          console.log(isBought);
          return (
            <Col key={index} span="md">
              <div
                onClick={({ target }) => {
                  if (!isBought) {
                    if (target.className !== `buttonAnimation${index}`) {
                      handleClickCourse(course.maKhoaHoc);
                    }
                  } else {
                    history.push("/home/user");
                  }
                }}
                className="col__wrapper"
              >
                <div className="image__background">
                  <img src={`${course?.hinhAnh}`} alt="..." />
                </div>
                <div className="info">
                  <h3>{course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</h3>
                  <p className="course__name">{course.tenKhoaHoc}</p>
                  <p>{course.moTa}</p>
                </div>
                {isBought ? (
                  <button
                    style={{ backgroundColor: "#fccf00" }}
                    className="button"
                    onClick={() => {
                      history.push("/home/user");
                    }}
                  >
                    Đã mua
                  </button>
                ) : (
                  <button className="button">
                    <div
                      onClick={(e) => {
                        handleAddCourse(course);
                        if (!hasBought) {
                          let tl = gsap.timeline();
                          tl.to(`.${e.target.className}`, {
                            x: "100%",
                            duration: 0.4,
                            ease: "power3.ease",
                          })
                            .to(`.btn${index}`, {
                              zIndex: 1,
                              x: "-50%",
                            })
                            .to(`.btn${index}`, {
                              scale: 1.5,
                              duration: 0.2,
                            })
                            .to(`.btn${index}`, {
                              scale: 1,
                              duration: 0.2,
                            });
                        }
                      }}
                      className={`buttonAnimation${index}`}
                    >
                      Thêm Vào Giỏ Hàng
                    </div>
                    <div className={`btn${index}`}>Added</div>
                  </button>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default CourseCard;
