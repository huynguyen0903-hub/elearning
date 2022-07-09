/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thongTinGioHang: [],
  totalPrice: 0,
  promotionAmount: 0,
  currentItem: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    themSanPham: (state, action) => {
      let isAdded = state.thongTinGioHang.findIndex((item) => {
        return item.maKhoaHoc === action.payload.maKhoaHoc;
      });
      if (isAdded === -1) {
        state.thongTinGioHang.push(action.payload);
      }
    },
    xoaSanPham: (state, action) => {
      console.log(action);
      if (action.payload?.taiKhoan) {
        state.thongTinGioHang = state.thongTinGioHang.filter((item) => {
          return item.maKhoaHoc !== action.payload.maKhoaHoc;
        });
      } else {
        let index = state.thongTinGioHang.findIndex((item) => {
          return item.maKhoaHoc === action.payload;
        });
        if (index >= 0) {
          state.thongTinGioHang = state.thongTinGioHang.filter((item) => {
            return item.maKhoaHoc !== action.payload;
          });
        }
      }
    },
    tongGiaTien: (state, action) => {
      state.totalPrice = action.payload.total;
      state.promotionAmount = action.payload.promotion;
      state.currentItem = action.payload.currentCart;
    },
  },
});

export const { tongGiaTien, xoaSanPham, themSanPham } = cartReducer.actions;

export default cartReducer.reducer;
