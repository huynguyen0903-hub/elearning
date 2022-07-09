/** @format */

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper";

import banner from "../../../assets/images/banner.png";
import banner2 from "../../../assets/images/banner2.png";
import { useHistory } from "react-router-dom";
import RowCourses from "../../../components/RowCourses";
import { useDispatch } from "react-redux";
import { ThongTinTaiKhoanAction } from "../../../redux/actions/types/QuanLyNguoiDungAction";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ThongTinTaiKhoanAction());
  });
  const history = useHistory();
  return (
    <div className="home__container">
      <Swiper
        slidesPerView={1}
        navigation={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={banner} alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="..." />
        </SwiperSlide>
      </Swiper>
      <div className="main__content">
        <div className="navBar">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            spaceBetween={10}
            modules={[Autoplay]}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            className="topic"
          >
            <SwiperSlide
              onClick={() => {
                history.push("/details/allcourses");
              }}
              className="green"
            >
              <i className="fa-solid fa-cube"></i>
              <span>Tất cả khóa học </span>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                history.push("/details/BackEnd");
              }}
              className="pink"
            >
              <i className="fa-solid fa-compass-drafting"></i>
              <span>BackEnd</span>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                history.push("/details/FrontEnd");
              }}
              className="yellow"
            >
              <i className="fa-solid fa-code"></i>
              <span>FrontEnd</span>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                history.push("/details/FullStack");
              }}
              className="purple"
            >
              <i className="fa-solid fa-laptop"></i>
              <span>FullStack</span>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                history.push("/details/TuDuy");
              }}
              className="navy"
            >
              <i className="fa-solid fa-money-bill-trend-up"></i>
              <span>Tư Duy</span>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="list__courses">
          <ul className="list__courses__wrapper">
            <RowCourses />
            <RowCourses />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
