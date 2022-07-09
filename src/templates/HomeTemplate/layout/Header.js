/** @format */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "antd";
import {
  UnorderedListOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CodepenOutlined,
  MessageOutlined,
  AntDesignOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import gsap from "gsap";
import { useHistory, useParams } from "react-router-dom";
import { AccessToken, USER_LOGIN } from "../../../ulti/setting";
import { useDispatch, useSelector } from "react-redux";
import { dangXuat } from "../../../redux/reducers/userReducer";
function Header() {
  const { category, keyword } = useParams();
  const [offset, setOffset] = useState(0);
  const history = useHistory();
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    let header = document.querySelector(".header");
    window.addEventListener("scroll", onScroll);
    if (offset > 50) {
      header.className = "header header-width";
    } else {
      header.className = "header";
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [offset]);
  const items = [
    {
      label: "Trang Chủ",
      key: "/home",
    },
    {
      label: "Khóa học của tôi",
      key: "/home/user",
    },
    {
      icon: <UnorderedListOutlined />,
      label: "Danh Mục",
      key: "SubMenu",
      children: [
        {
          label: "FrontEnd",
          icon: <CodepenOutlined />,
          key: "/details/FrontEnd",
        },
        {
          label: "BackEnd",
          icon: <MessageOutlined />,
          key: "/details/BackEnd",
        },
        {
          label: "FullStack",
          icon: <AntDesignOutlined />,
          key: "/details/FullStack",
        },
        {
          label: "Tư Duy",
          icon: <CodeOutlined />,
          key: "/details/TuDuy",
        },
      ],
    },
  ];
  return (
    <div className="header">
      <h1
        onClick={() => {
          history.push("/home");
        }}
        className="lable"
      >
        EduMall
      </h1>
      <Menu
        onClick={(e) => {
          // history.push("/home");
          history.push(`${e.key}`);
        }}
        className="menuHeader"
        mode="horizontal"
        items={items}
      />
      <div style={{ flexGrow: 1 }}></div>
      <CourseSearch category={category} valueSearch={keyword} />
      <Cart />
      <ModalUser />
    </div>
  );
}

export default Header;

export const CourseSearch = (props) => {
  const history = useHistory();

  const [valueSearch, setValueSearch] = useState(
    props.valueSearch ? props.valueSearch : ""
  );
  const goToSearch = useCallback(() => {
    if (valueSearch.trim().length > 0) {
      history.push(
        `/details/${
          props.category === undefined ? "allcourses" : props.category
        }/search/${valueSearch}`
      );
    }
  }, [valueSearch, props.category, history]);
  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => document.removeEventListener("keyup", enterEvent);
  }, [valueSearch, goToSearch]);
  return (
    <input
      value={valueSearch}
      type="text"
      className="search__input"
      placeholder="Tìm kiếm khóa học"
      onChange={(e) => {
        setValueSearch(e.target.value);
      }}
    />
  );
};

export function ModalUser() {
  const [isActive, setIsActive] = useState(false);
  const myRef = useRef();
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setIsActive(false);
    }
  };
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isActive) {
      gsap.from(".modalUser__container", {
        opacity: 0,
        duration: 0.2,
        y: -100,
        ease: "power3.ease",
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);
  return (
    <div ref={myRef} className="user__wrapper">
      <UserOutlined
        onClick={() => {
          setIsActive((isActive) => !isActive);
        }}
      />
      {isActive && (
        <div className="modalUser__container">
          <div className="avatar">
            <img src="https://picsum.photos/200/300?random=2" alt="..." />
            <div className="name">
              {JSON.parse(localStorage.getItem(USER_LOGIN)).hoTen}
            </div>
          </div>
          <span
            onClick={(e) => {
              setTimeout(() => history.push("/home/user"), 500);
            }}
          >
            Trang Cá Nhân
          </span>
          <hr />
          <span
            onClick={(e) => {
              setTimeout(() => history.push("/home/user"), 500);
            }}
          >
            Cài Đặt
          </span>
          <hr />

          <button
            onClick={() => {
              console.log("first");
              localStorage.removeItem(USER_LOGIN);
              console.log("second");
              localStorage.removeItem(AccessToken);
              console.log("third");
              dispatch(dangXuat());
              console.log("go");
              history.go("/");
            }}
          >
            Đăng Xuất
          </button>
        </div>
      )}
    </div>
  );
}

export function Cart() {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();
  const { thongTinGioHang } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );
  useEffect(() => {
    if (isActive) {
      gsap.from(".cart__container", {
        y: -100,
        duration: 0.2,
        ease: "power3.ease",
      });
    }
  }, [isActive]);
  return (
    <div
      onMouseEnter={() => {
        setIsActive((isActive) => !isActive);
      }}
      className="cart__wrapper"
      onMouseLeave={() => {
        setIsActive((isActive) => !isActive);
      }}
      onClick={() => {
        history.push("/cart");
      }}
    >
      <ShoppingCartOutlined />
      {isActive && (
        <div className="cart__container">
          {thongTinGioHang.length === 0 ? (
            <>
              <p>Giỏ hàng hiện đang trống</p>
              <span>Hãy tiếp tục tìm kiếm thêm khoá học nhé</span>
            </>
          ) : (
            <>
              <p>{thongTinGioHang.length} sản phẩn trong giỏ hàng </p>
              <span>Hãy tiếp tục tìm kiếm thêm khoá học nhé</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
