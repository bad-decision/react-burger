import {
  CREATED,
  CREATED_RU,
  DONE,
  DONE_RU,
  PENDING,
  PENDING_RU,
} from './orderStatuses';
import { IIngredientDetails, TOrderStatus } from './types';

export const setHash = (value: string) => `${value}_${new Date().getTime()}`;

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const getClearAccessToken = () => {
  const token = getAccessToken();
  return token?.substring(7, token.length);
};

export const setAccessToken = (token: string) =>
  localStorage.setItem('accessToken', token);
export const setRefreshToken = (token: string) =>
  localStorage.setItem('refreshToken', token);

export const removeAccessToken = () => localStorage.removeItem('accessToken');
export const removeRefreshToken = () => localStorage.removeItem('refreshToken');

export const getOrderTimeStamp = (date: string | undefined) => {
  if (!date) return null;

  const dateTime = new Date(date);
  const offset = dateTime.getTimezoneOffset() / -60;

  const formatDate = dateTime.toLocaleDateString();
  const formatTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formatOffset = offset > 0 ? `+${offset}` : offset;

  return `${formatDate}, ${formatTime} i-GMT${formatOffset}`;
};

export const getOrderPrice = (
  orderIngredients: string[] | undefined,
  allIngredients: IIngredientDetails[] | undefined
) => {
  if (!orderIngredients || !allIngredients) return 0;
  return orderIngredients.reduce((sum: number, id: string) => {
    const ingredient = allIngredients?.find((x) => x._id === id);
    return ingredient ? sum + ingredient.price : sum;
  }, 0);
};

export const getOrderStatus = (status: TOrderStatus | undefined) => {
  switch (status) {
    case DONE:
      return DONE_RU;
    case CREATED:
      return CREATED_RU;
    case PENDING:
      return PENDING_RU;
    default:
      break;
  }
};
