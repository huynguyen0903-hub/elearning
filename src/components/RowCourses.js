/** @format */

import { Col, Row } from "antd";
import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
function RowCourses() {
  const history = useHistory();
  const data = [
    {
      topic: "/details/allcourses",
      src: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
    },
    {
      topic: "/details/allcourses",
      src: "https://files.fullstack.edu.vn/f8-prod/courses/2.png",
    },
    {
      topic: "/details/allcourses",
      src: "https://files.fullstack.edu.vn/f8-prod/courses/3.png",
    },
    {
      topic: "/details/allcourses",
      src: "https://files.fullstack.edu.vn/f8-prod/courses/1.png",
    },
    {
      topic: "/details/allcourses",
      src: "https://files.fullstack.edu.vn/f8-prod/courses/12.png",
    },
    {
      topic: "/details/allcourses",
      src: "https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png",
    },
  ];
  const handleClick = (topic) => {
    history.push(topic);
  };
  return (
    <>
      <div className="row">
        <div className="row__header">
          <h1>Khóa học nổi bật</h1>
          <a href="/details/allcourses" className="more">
            Xem Thêm <RightOutlined />
          </a>
        </div>
        <Row gutter={[18, 18]}>
          {data.map((item, index) => (
            <Col key={index} span="md">
              <div
                className="item"
                onClick={() => {
                  handleClick(item.topic);
                }}
              >
                <button>Xem chi tiết</button>
                <img src={`${item.src}`} alt="noImage" />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default RowCourses;
