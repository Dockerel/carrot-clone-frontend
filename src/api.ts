import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

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
  phone_nb: string;
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
  phone_nb,
  password,
  password_check,
}: ISignUpVariables) => {
  return instance
    .post(
      "users/",
      { username, email, phone_nb, password, password_check },
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
