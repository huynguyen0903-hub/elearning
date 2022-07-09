/** @format */

import { quanLyKhoaHocService } from "../../../ulti/QuanLyKhoaHocService";
import { themSanPham } from "../../reducers/cartReducer";
import {
  ghiDanhKhoaHoc,
  layDanhSachKhoaHoc,
  layDanhSachKhoaHocTheoDanhMuc,
  loadThongTinKhoaHoc,
} from "../../reducers/courseReducer";

export const layKhoaHocTheoDanhMucAction = (danhMucKhoaHoc) => {
  return async (dispatch) => {
    try {
      let result = await quanLyKhoaHocService.layKhoaHocTheoDanhMuc(
        danhMucKhoaHoc
      );
      dispatch(layDanhSachKhoaHocTheoDanhMuc(result.data));
    } catch (error) {
      console.log(error);
      dispatch(
        layDanhSachKhoaHocTheoDanhMuc({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  };
};
export const layDanhSachKhoaHocAction = (keyword) => {
  return async (dispatch) => {
    try {
      let result = await quanLyKhoaHocService.layDanhSachKhoaHoc(keyword);
      dispatch(layDanhSachKhoaHoc(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const layThongTinKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const result = await quanLyKhoaHocService.layThongTinKhoaHoc(maKhoaHoc);
      dispatch(themSanPham(result.data));
    } catch (error) {
      alert("Mã Khóa Học Không Hợp Lệ");
    }
  };
};

export const dangKyKhoaHocAction = (thongTinGhiDanh) => {
  return async (dispatch) => {
    try {
      let result = await quanLyKhoaHocService.ghiDanhKhoaHoc(thongTinGhiDanh);
      dispatch(ghiDanhKhoaHoc(result.data));
    } catch (error) {
      dispatch(ghiDanhKhoaHoc(error.response.data));
    }
  };
};
export const loadThongTinKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const result = await quanLyKhoaHocService.layThongTinKhoaHoc(maKhoaHoc);
      dispatch(loadThongTinKhoaHoc(result.data));
    } catch (error) {
      alert("Mã khóa học không hợp lệ");
    }
  };
};
export const xoaKhoaHocAction = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      const result = await quanLyKhoaHocService.xoaKhoaHoc(maKhoaHoc);
      dispatch(layDanhSachKhoaHocAction());
      console.log(`xóa thành công ${maKhoaHoc}`);
    } catch (errors) {
      alert(`${errors.response.data}`);
    }
  };
};
export const themKhoaHocUploadHinhAction = (formData) => {
  console.log("themKhoaHocUploadHinhAction");
  return async (dispatch) => {
    try {
      let result = await quanLyKhoaHocService.themKhoaHocUploadHinh(formData);
      alert("Thêm Khóa Học Thành Công");
    } catch (errors) {
      console.log(errors);
    }
  };
};
export const capNhatKhoaHocUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyKhoaHocService.capNhatKhoaHocUpload(formData);
      alert("Cập nhật khóa học thành công");
      console.log("result", result);
    } catch (errors) {
      console.log(errors);
    }
  };
};
