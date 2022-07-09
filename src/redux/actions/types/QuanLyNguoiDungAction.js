/** @format */

import { quanLyNguoiDungService } from "../../../ulti/QuanLyNguoiDungService";
import { AccessToken, USER_LOGIN } from "../../../ulti/setting";
import {
  capNhatThongTinNguoiDung,
  setDanhSachNguoiDung,
} from "../../reducers/adminReducer";
import {
  capNhatThongTin,
  DangKy,
  DangNhap,
  ThongTinTaiKhoan,
} from "../../reducers/userReducer";
export const DangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      dispatch(DangKy({ ...result.data, status: result.status }));
    } catch (errors) {
      dispatch(DangKy(errors.response.data));
    }
  };
};
export const DangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
      localStorage.setItem(AccessToken, result.data.accessToken);
      dispatch(DangNhap({ ...result.data, status: result.status }));
    } catch (errors) {
      dispatch(DangNhap(errors.response.data));
    }
  };
};
export const ThongTinTaiKhoanAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinTaiKhoan();
      dispatch(ThongTinTaiKhoan({ ...result.data, status: result.status }));
    } catch (error) {
      alert("Failed to load user profile");
    }
  };
};
export const CapNhatThongTinAction = (valueEdit) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTin(valueEdit);
      console.log(result);
      dispatch(capNhatThongTin({ ...result.data, status: result.status }));
    } catch (error) {
      console.log(error);
      // dispatch(
      //   capNhatThongTin({
      //     ...error.response.status,
      //   })
      // );
    }
  };
};
export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
      //gửi result.data lên userReducer để xử lý
      dispatch(setDanhSachNguoiDung(result.data));
    } catch (errors) {
      alert("Call API failed");
    }
  };
};
export const xoaNguoiDungAction = (TaiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(TaiKhoan);
      alert("Xóa thành công người dùng !");
      dispatch(layDanhSachNguoiDungAction());
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const capNhatThongTinNguoiDungAction = (values) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        values
      );
      dispatch(
        capNhatThongTinNguoiDung({ ...result.data, status: result.status })
      );
    } catch (errors) {
      console.log(errors);
      dispatch(capNhatThongTinNguoiDung(errors.response.data));
    }
  };
};

export const themNguoiDungAction = (values) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.themNguoiDung(values);
      console.log(result);
      alert("Thêm Thành công");
    } catch (errors) {
      alert(errors.response.data);
    }
  };
};
