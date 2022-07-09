/** @format */

import { Route } from "react-router";
import React from "react";
import _ from "lodash";

import { DesktopOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  // const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    // console.log(collapsed);
    setCollapsed(collapsed);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // if (!localStorage.getItem(USER_LOGIN)) {
  //   alert('Bạn không có quyền truy cập vào trang này !')
  //   return <Redirect to='/' />
  // }

  // if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
  //   alert('Bạn không có quyền truy cập vào trang này !')
  //   return <Redirect to='/' />

  // }
  const operations = (
    <Fragment>
      {/* {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}> <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-5 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</div>Hello ! {userLogin.taiKhoan}</button> <button onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
        }} className="text-blue-800">Đăng xuất</button> </Fragment> : ''} */}
    </Fragment>
  );
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo p-3">
            <img
              src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
              alt="..."
            />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu key="1" icon={<UserOutlined />} title="Users">
              <Menu.Item key="2" icon={<UserOutlined />}>
                <NavLink to="/admin/users">Users</NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                <NavLink to="/admin/dashboard/addnewuser">Add new</NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub1" icon={<FileOutlined />} title="Courses">
              <Menu.Item key="10" icon={<FileOutlined />}>
                <NavLink to="/admin/courses">Courses</NavLink>
              </Menu.Item>
              <Menu.Item key="11" icon={<FileOutlined />}>
                <NavLink to="/admin/courses/addnew">Add new</NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <NavLink to="/admin/showtimes">Showtime</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="text-right pr-10 pt-1">{operations}</div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: "85vh" }}
            >
              <Component />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminTemplate;
