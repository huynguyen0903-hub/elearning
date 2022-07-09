/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RightCircleOutlined } from "@ant-design/icons";
//css
import "./_Default.scss";
import "./index.scss";

//gsap animation
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import MouseFollower from "mouse-follower";

// data
import Footer from "../../templates/HomeTemplate/layout/Footer";
import videoEducation from "../LandingPage/videos/video_preview_h264.mp4";
import app from "./videos/apps.mp4";
import branding from "./videos/branding.mp4";
import website from "./videos/websites.mp4";
import {
  DangKyAction,
  DangNhapAction,
} from "../../redux/actions/types/QuanLyNguoiDungAction";
import { validateInput } from "../../validator/validator";

MouseFollower.registerGSAP(gsap);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

function Default() {
  const cursor = new MouseFollower({
    speed: 0.6,
  });

  useEffect(() => {
    let paddingWebsite = document.querySelector(
      ".hero-inner-link-item-website"
    );
    let paddingApp = document.querySelector(".hero-inner-link-item-app");
    let paddingBranding = document.querySelector(
      ".hero-inner-link-item-branding"
    );
    let websiteSpan = document.querySelector(".website");
    let appSpan = document.querySelector(".app");
    let brandingSpan = document.querySelector(".branding");
    //set video
    websiteSpan.addEventListener("mouseenter", () => {
      cursor.addState("-exclusion");
    });
    appSpan.addEventListener("mouseover", () => {
      cursor.addState("-exclusion");
    });
    brandingSpan.addEventListener("mouseenter", () => {
      cursor.addState("-exclusion");
    });
    paddingApp.addEventListener("mouseenter", () => {
      cursor.setVideo(app);
    });
    paddingWebsite.addEventListener("mouseenter", () => {
      cursor.setVideo(website);
    });
    paddingBranding.addEventListener("mouseenter", () => {
      cursor.setVideo(branding);
    });
    //remove video
    paddingApp.addEventListener("mouseleave", () => {
      cursor.removeMedia();
    });
    paddingWebsite.addEventListener("mouseleave", () => {
      cursor.removeMedia();
    });
    paddingBranding.addEventListener("mouseleave", () => {
      cursor.removeMedia();
    });
    websiteSpan.addEventListener("mouseleave", () => {
      cursor.removeState("-exclusion");
    });
    appSpan.addEventListener("mouseleave", () => {
      cursor.removeState("-exclusion");
    });
    brandingSpan.addEventListener("mouseleave", () => {
      cursor.removeState("-exclusion");
    });
    gsap.to(".mask", {
      scrollTrigger: {
        trigger: ".default__container__background__scale",
        start: "center center",
        end: "+=500",
        pin: true,
        scrub: true,
      },
      scale: 1.5,
    });
    const handleScrollHeader = () => {
      if (window.scrollY >= "100") {
        document.querySelector(".default__container__header").style.height =
          "120px";
        document.querySelector(
          ".default__container__header"
        ).style.backgroundColor = "#111111";
        document.querySelector(".header__logo").style.color = "#ffffff";
      } else {
        document.querySelector(".default__container__header").style.height =
          "75px";
        document.querySelector(
          ".default__container__header"
        ).style.backgroundColor = "#ffffff";
        document.querySelector(".header__logo").style.color = "#111111";
      }
    };
    window.addEventListener("scroll", handleScrollHeader);
    return () => {
      window.removeEventListener("scroll", handleScrollHeader);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="default__container">
        <div className="default__container__header">
          <div className="header__logo">EduMall</div>
          <div className="header__buttons">
            <div className="signin">
              <SignIn />
            </div>
            <div className="signup">
              <span
                onClick={() => {
                  gsap.to(window, { duration: 1, scrollTo: "#signup" });
                }}
                className="signup"
              >
                Đăng ký
              </span>
            </div>
          </div>
        </div>
        <div className="default__container__hero">
          <div className="hero-inner">
            <div className="hero-inner-col">
              <div className="hero-inner-title">
                <h1>We Make It Happen</h1>
              </div>
              <div className="hero-inner-links">
                <div className="hero-inner-link-item-website">
                  <div className="hero-inner-link-item-padding-website" />
                  <span className="website">LEARNING</span>
                </div>
                <div className="hero-inner-link-item-app">
                  <div className="hero-inner-link-item-padding-app" />
                  <span className="app">MORE</span>
                </div>
                <div className="hero-inner-link-item-branding">
                  <div className="hero-inner-link-item-padding-branding" />
                  <span className="branding">EASIER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="default__container__background__scale">
          <div className="mask"></div>
          <video src={videoEducation} autoPlay={true} loop muted></video>
        </div>
        <SignUp />
        <Footer />
      </div>
    </>
  );
}

export default Default;
//////////

const SignUp = () => {
  const dispatch = useDispatch();
  const [errors, setError] = useState({
    email: { isValidInput: true, errorMessage: "" },
    soDT: { isValidInput: true, errorMessage: "" },
    hoTen: { isValidInput: true, errorMessage: "" },
  });

  const signUpValue = useRef({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maNhom: "GP01",
    email: "",
  });
  const { isSuccessSignUp, errorMessage } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
  const handleValidInput = (checkingValue, type) => {
    let { isValidInput, errorMessage } = validateInput(checkingValue, type);
    setError({
      ...errors,
      [type]: {
        errorMessage: errorMessage,
        isValidInput: isValidInput,
      },
    });
  };
  const handleChange = (target) => {
    let { value, name } = target;
    signUpValue.current[name] = value;
  };
  const handleBlur = (target) => {
    let { value, name } = target;
    handleValidInput(value, name);
  };
  useEffect(() => {
    if (isSuccessSignUp) {
      let tl = gsap.timeline();
      tl.fromTo(
        ".left__inner",
        { opacity: 1 },
        {
          opacity: 0,
          duration: 1.5,
        }
      ).to(".signin", {
        duration: 0.2,
        scale: 1.5,
      });
    }
  }, [isSuccessSignUp]);
  return (
    <div id="signup" className="sign__up__container">
      <div className="sign__up__container__inner">
        <div className="sign__up__container__inner__content">
          <div className="sign__up__container__inner__content-left">
            <div className="left__inner">
              <span>A CyberSoft Academy's member</span>
              <div className="wrapper">
                <input
                  onChange={({ target }) => {
                    handleChange(target);
                  }}
                  className="user__name"
                  name="taiKhoan"
                  type="text"
                  placeholder="Nhập tên tài khoản"
                />
              </div>
              <div className="wrapper">
                <input
                  onChange={({ target }) => {
                    handleChange(target);
                  }}
                  name="matKhau"
                  className="user__password"
                  type="password"
                  placeholder="Nhập Mật Khẩu"
                />
              </div>
              <div className="wrapper">
                <input
                  onChange={({ target }) => {
                    handleChange(target);
                  }}
                  onBlur={({ target }) => {
                    handleBlur(target);
                  }}
                  name="hoTen"
                  className="ho__ten"
                  type="text"
                  placeholder="Nhập họ tên"
                />
                {errors.hoTen.errorMessage ? (
                  <span>{errors.hoTen.errorMessage}</span>
                ) : null}
              </div>
              <div className="wrapper">
                <input
                  onChange={({ target }) => {
                    handleChange(target);
                  }}
                  onBlur={({ target }) => {
                    handleBlur(target);
                  }}
                  name="soDT"
                  className="sdt"
                  type="text"
                  placeholder="Nhập số điện thoại"
                />
                {errors.soDT.errorMessage ? (
                  <span>{errors.soDT.errorMessage}</span>
                ) : null}
              </div>
              <div className="wrapper">
                <input
                  onChange={({ target }) => {
                    handleChange(target);
                  }}
                  onBlur={({ target }) => {
                    handleBlur(target);
                  }}
                  name="email"
                  className="email"
                  type="email"
                  placeholder="Nhập email"
                />
                {errors.email.isValidInput ? null : (
                  <span>{errors.email.errorMessage}</span>
                )}
              </div>
              <div className="wrapper">
                <button
                  disabled={
                    !(
                      errors.email.isValidInput &&
                      errors.soDT.isValidInput &&
                      errors.hoTen.isValidInput
                    )
                  }
                  onClick={() => {
                    if (
                      errors.email.isValidInput &&
                      errors.soDT.isValidInput &&
                      errors.hoTen.isValidInput
                    ) {
                      dispatch(DangKyAction(signUpValue.current));
                    }
                  }}
                >
                  Đăng Ký Ngay
                </button>
                {errorMessage ? <span>{errorMessage}</span> : null}
              </div>
            </div>
          </div>
          <div className="sign__up__container__inner__content-right">
            <video src={website} autoPlay={true} loop={true} muted />
          </div>
        </div>
      </div>
    </div>
  );
};

const SignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const myRef = useRef(); // eslint-disable-next-line
  const dispatch = useDispatch();
  const { isSuccessSignIn, errorMessage } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
  const history = useHistory();
  const userLogin = useRef({
    taiKhoan: "",
    matKhau: "",
  });
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      gsap.from(".sign__in__container", {
        opacity: 0,
        duration: 0.3,
        y: -100,
        ease: "power3.easeInOut",
      });
      const enterEvent = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
          dispatch(DangNhapAction(userLogin.current));
        }
      };
      document
        .querySelector(".sign__in__container__inner__content")
        .addEventListener("keyup", enterEvent);
    }
    if (isSuccessSignIn) {
      history.go("/home");
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, isSuccessSignIn]);
  return (
    <div ref={myRef}>
      <span
        onClick={() => {
          setIsActive((isActive) => !isActive);
        }}
        className="signin"
      >
        Đăng Nhập
      </span>
      {isActive && (
        <div className="sign__in__container">
          <div className="sign__in__container__inner">
            <form className="sign__in__container__inner__content">
              <input
                onChange={({ target }) => {
                  let { value, name } = target;
                  userLogin.current[name] = value;
                }}
                name="taiKhoan"
                type="text"
                placeholder="Tài khoản"
              />
              <input
                onChange={({ target }) => {
                  let { value, name } = target;
                  userLogin.current[name] = value;
                }}
                name="matKhau"
                type="password"
                placeholder="Mật Khẩu"
              />
              <RightCircleOutlined
                onClick={async () => {
                  dispatch(DangNhapAction(userLogin.current));
                }}
              />
            </form>

            {errorMessage ? <i>{errorMessage}</i> : null}
          </div>
        </div>
      )}
    </div>
  );
};
