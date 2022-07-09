/** @format */

import axios from "axios";
import { AccessToken, DOMAIN, TOKEN_CYBERSOFT } from "../ulti/setting";

export class baseService {
  //put json về phía backend
  put = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AccessToken),
        TokenCybersoft: TOKEN_CYBERSOFT,
      }, //JWT
    });
  };

  post = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AccessToken),
        TokenCybersoft: TOKEN_CYBERSOFT,
      }, //JWT
    });
  };

  get = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AccessToken),
        TokenCybersoft: TOKEN_CYBERSOFT,
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  delete = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AccessToken),
        TokenCybersoft: TOKEN_CYBERSOFT,
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };
}
