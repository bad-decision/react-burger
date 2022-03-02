export const setHash = (value: string) => `${value}_${new Date().getTime()}`;

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setAccessToken = (token: string) =>
  localStorage.setItem('accessToken', token);
export const setRefreshToken = (token: string) =>
  localStorage.setItem('refreshToken', token);

export const removeAccessToken = () => localStorage.removeItem('accessToken');
export const removeRefreshToken = () => localStorage.removeItem('refreshToken');
