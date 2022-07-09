/** @format */

import { Breadcrumb } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  layDanhSachKhoaHocAction,
  layKhoaHocTheoDanhMucAction,
} from "../../../../redux/actions/types/QuanLyKhoaHocAction";
import { CourseSearch } from "../../../../templates/HomeTemplate/layout/Header";
import CourseCard from "../../../../components/CourseCard";
function Details() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { category, keyword } = useParams();
  const { courseArray, notFound } = useSelector(
    (rootReducer) => rootReducer.courseReducer
  );
  const listCategory = [
    "allcourses",
    "BackEnd",
    "FrontEnd",
    "FullStack",
    "TuDuy",
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    if (keyword) {
      dispatch(layDanhSachKhoaHocAction(keyword));
    } else if (category === "allcourses") {
      dispatch(layDanhSachKhoaHocAction());
    } else {
      dispatch(layKhoaHocTheoDanhMucAction(category));
    }
  }, [category, keyword]);

  return (
    <div>
      <div className="container__details">
        <div className="header__background">
          <div className="header__title">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/home">Home</a>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                {listCategory.includes(category) ? category : "notFound"}
              </Breadcrumb.Item>
            </Breadcrumb>
            <h1>{listCategory.includes(category) ? category : "notFound"}</h1>
          </div>
        </div>
        <div className="main__details">
          <div className="topic">
            <CourseSearch category={category} valueSearch={keyword} />
            <ul>
              <a href="/details/allcourses">Tất cả khóa học</a>
              <a href="/details/BackEnd">Back End</a>
              <a href="/details/FrontEnd">Front End</a>
              <a href="/details/FullStack">Full Stack</a>
              <a href="/details/TuDuy">Tư Duy</a>
            </ul>
          </div>
          <div className="content">
            <CourseCard category={category} courseArray={courseArray} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
