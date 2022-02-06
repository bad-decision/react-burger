export const setHash = (value) => `${value}_${new Date().getTime()}`;

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const setAccessToken = (token) => localStorage.setItem("accessToken", token);
export const setRefreshToken = (token) => localStorage.setItem("refreshToken", token);

export const removeAccessToken = () => localStorage.removeItem("accessToken");
export const removeRefreshToken = () => localStorage.removeItem("refreshToken");
