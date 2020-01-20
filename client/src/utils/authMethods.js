import customAxios from "./customAxios";

export const login = user =>
  customAxios({
    method: "post",
    url: "/login",
    data: user
  }).then(res => {
    saveUser(res.data);
  });

export const signup = user =>
  customAxios({
    method: "post",
    url: "/signup",
    data: user
  }).then(res => {
    saveUser(res.data);
  });

export const logout = () =>
  customAxios({
    method: "post",
    url: "/logout"
  }).then(() => removeUser());

export const saveUser = user =>
  localStorage.setItem("user", JSON.stringify(user));

export const removeUser = () => localStorage.removeItem("user");

export const getUser = () => JSON.parse(localStorage.getItem("user"));

export const loggedIn = () => !!getUser();
