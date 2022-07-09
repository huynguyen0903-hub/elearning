/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGIN } from "../../ulti/setting";

const initialState = {
  userValue: {
    chiTietKhoaHocGhiDanh: [],
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "",
    email: "",
  },
  errorMessage: "",
  successMessage: "Cập Nhật Thành Công",
  isSuccessSignUp: false,
  isSuccessSignIn: false,
  updateStatus: true,
  updateMessage: "",
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    DangKy: (state, action) => {
      if (action.payload.status === 200) {
        state.userValue = action.payload;
        state.errorMessage = "";
        state.isSuccessSignUp = true;
      } else {
        state.errorMessage = action.payload;
        state.isSuccessSignUp = false;
      }
    },
    DangNhap: (state, action) => {
      if (action.payload.status === 200) {
        state.isSuccessSignIn = true;
      } else {
        state.errorMessage = action.payload;
        state.isSuccessSignIn = false;
      }
    },
    ThongTinTaiKhoan: (state, action) => {
      if (action.payload.status === 200) {
        state.userValue = action.payload;
      }
    },

    capNhatThongTin: (state, action) => {
      console.log("payload", action.payload);
      console.log("userValue", state.userValue);
      if (action.payload.status === 200) {
        state.userValue = { ...state.userValue, ...action.payload };
        localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload));
      } else {
        state.successMessage = "Cập Nhật Thất Bại";
      }
    },
    dangXuat: (state, action) => {
      state.isSuccessSignIn = false;
    },
  },
});

export const { dangXuat, DangKy, DangNhap, ThongTinTaiKhoan, capNhatThongTin } =
  userReducer.actions;

export default userReducer.reducer;
