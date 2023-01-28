import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { IModifyUserMe } from "./types";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getProducts = () =>
  instance.get("products/").then((response) => response.data);

export const getProduct = ({ queryKey }: QueryFunctionContext) => {
  const [_, productPk] = queryKey;
  return instance
    .get(`products/${productPk}`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get("users/me").then((response) => response.data);

interface ISignUpVariables {
  username: string;
  email: string;
  password: string;
  password_check: string;
}

interface ISignInVariables {
  username: string;
  password: string;
}

export const signUp = ({
  username,
  email,
  password,
  password_check,
}: ISignUpVariables) => {
  return instance
    .post(
      "users/",
      { username, email, password, password_check },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.data);
};

export const signIn = ({ username, password }: ISignInVariables) => {
  return instance
    .post(
      "users/signin",
      { username, password },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.data);
};

export const signOut = () =>
  instance
    .post("users/signout", null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.status);

export const githubLogin = (code: string) =>
  instance
    .post(
      "users/github",
      { code },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  instance
    .post(
      "users/kakao",
      { code },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.status);

interface INaverLogin {
  code: string;
  state: string;
}

export const naverLogin = ({ code, state }: INaverLogin) =>
  instance
    .post(
      "users/naver",
      { code, state },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.status);

export const userModify = (data: IModifyUserMe) =>
  instance
    .put("users/me", data, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.status);

export const getPublicUserDetail = ({ queryKey }: QueryFunctionContext) => {
  const [_, username] = queryKey;
  return instance.get(`users/@${username}`).then((res) => res.data);
};

export const getUserOnSaleProducts = ({ queryKey }: QueryFunctionContext) => {
  const [_, username] = queryKey;
  return instance.get(`products/@${username}`).then((res) => res.data);
};

export const postProductIsSold = (pk: number) =>
  instance
    .post(`products/${pk}/sold`, null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((res) => res.status);

export const postUploadURL = () =>
  instance
    .post("photos/get-url", null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((res) => res.data);

export interface IUploadImageVaraibles {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVaraibles) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  productPk: string;
}

export const createPhoto = ({
  description,
  file,
  productPk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `products/${productPk}/photos`,
      { description, file },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((res) => res.data);

export interface IUploadProductVariables {
  name: string;
  price: number;
  description: string;
  kind: string;
}

export const postUploadProduct = ({
  name,
  price,
  description,
  kind,
}: IUploadProductVariables) =>
  instance
    .post(
      "products/",
      { name, price, description, kind },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((res) => res.data);

export interface IModifyProductVariables {
  name: string;
  price: number;
  description: string;
  kind: string;
  productPk: string;
}

export const putProductInformation = ({
  name,
  price,
  description,
  kind,
  productPk,
}: IModifyProductVariables) =>
  instance
    .put(
      `products/${productPk}`,
      { name, price, description, kind },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((res) => res.status);

interface IPutProductBuyerVariables {
  productPk: string;
  username: string;
}

export const putProductBuyer = ({
  productPk,
  username,
}: IPutProductBuyerVariables) =>
  instance
    .put(`products/${productPk}/${username}`, null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((res) => res.data);

export const getPurchaseHistory = ({ queryKey }: QueryFunctionContext) => {
  const [_, username] = queryKey;
  return instance
    .get(`/products/@${username}/purchase-history`)
    .then((res) => res.data);
};

export const getReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, username] = queryKey;
  return instance.get(`/reviews/@${username}`).then((res) => res.data);
};
