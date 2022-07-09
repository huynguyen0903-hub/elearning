/** @format */


export const validateInput = (checkingValue, type) => {
  if (type === "soDT") {
    const regex = /^\d{10,11}$/;
    const checkingResult = regex.exec(checkingValue);
    if (checkingResult !== null) {
      return { isValidInput: true, errorMessage: "" };
    } else {
      return {
        isValidInput: false,
        errorMessage: "Số điện thoại phải có 10 - 11 chữ số.",
      };
    }
  }
  if (type === "email") {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkingResult = regex.exec(checkingValue);
    if (checkingResult !== null) {
      return {
        isValidInput: true,
        errorMessage: "",
      };
    } else {
      return {
        isValidInput: false,
        errorMessage: "Email không hợp lê",
      };
    }
  }
  if (type === "hoTen") {
    const regex = /^[a-zA-Z ]*$/;
    const checkingResult = regex.exec(checkingValue);
    if (checkingResult !== null) {
      return { isValidInput: true, errorMessage: "" };
    } else {
      return {
        isValidInput: false,
        errorMessage: "Không được có ký tự đặc biệt",
      };
    }
  }
};
