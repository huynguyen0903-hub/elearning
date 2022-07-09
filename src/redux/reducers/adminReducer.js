/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrUser: [],
  userEdit: {},
  updateStatus: true,
  updateMessage: "",
  addNewStatus: false,
  addNewMessage: "",
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    setDanhSachNguoiDung: (state, action) => {
      // gán dữ liệu lấy được từ api cho biến arrUser trong state
      state.arrUser = action.payload;
    },
    capNhatThongTinNguoiDung: (state, action) => {
      if (action.payload.status === 200) {
        state.updateStatus = true;
        state.updateMessage = "Cập Nhật Thành Công";
        state.userEdit = action.payload;
      } else {
        state.updateStatus = false;
        state.updateMessage = action.payload;
      }
    },
    setUserEdit: (state, action) => {
      state.userEdit = action.payload;
    },
    themNguoiDung: (state, action) => {
        state.addNewMessage = ""
    },
  },
});

export const { setDanhSachNguoiDung, capNhatThongTinNguoiDung, setUserEdit } =
  adminReducer.actions;

export default adminReducer.reducer;
