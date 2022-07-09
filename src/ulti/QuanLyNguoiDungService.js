/** @format */

import { baseService } from "./baseService";
import { GROUPID } from "./setting";
export class QuanLyNguoiDungService extends baseService {
  dangKy = (thongTinDangKy) => {
    return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };
  dangNhap = (thongTinDangNhap) => {
    return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  layThongTinTaiKhoan = () => {
    return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  capNhatThongTin = (userValue) => {
    return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userValue);
  };
  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa.trim() !== "") {
      return this.get(
        `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
      );
    }
    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  xoaNguoiDung = (TaiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`
    );
  };
  timKiemNguoiDung = (tuKhoa) => {
    console.log("từ khóa", tuKhoa);
    return this.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
    );
  };
  capNhatThongTinNguoiDung = (formValue) => {
    return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, {
      ...formValue,
      maNhom: GROUPID,
    });
  };
  themNguoiDung = (values) => {
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, values);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
