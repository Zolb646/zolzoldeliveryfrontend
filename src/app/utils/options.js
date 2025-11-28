"use client";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const getOptions = () => {
  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };
};

export const createOptions = () => {
  return {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};

export const patchOptions = () => {
  return {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};

export const deleteOptions = () => {
  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};
