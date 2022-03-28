import { CREATED, DONE, PENDING } from './orderStatuses';

export interface IUser {
  email: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IIngredientDetails {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  _id: string;
  _hash: string;
}

export interface IAuthState {
  user: IUser | null;
  forgotPassword: boolean;
}

export interface IBurgerConstructorState {
  bun: IIngredientDetails | null;
  insideItems: IIngredientDetails[];
}

export interface IBurgerIngredient {
  ingredientDetails: IIngredientDetails | null;
}

export interface ILocationModal {
  background?: boolean;
}

export interface IResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IHasUser {
  user: IUser;
}

export interface IUserAuth extends IAuthResponse, IHasUser {}

export interface IOrderResponse {
  order: {
    number: number;
  };
}

export interface IResetPasswordQuery {
  password: string;
  token: string;
}

export interface IRegisterQuery {
  name: string;
  email: string;
  password: string;
}

export type TOrderStatus = typeof DONE | typeof PENDING | typeof CREATED;

export interface IMessage {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface IOrders {
  orders: IOrder[];
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: TOrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type TWSState = {
  wsConnected: boolean;
  message: IMessage | null;
  error?: Event;
};

export type TMakeOrderBody = {
  ingredients: string[];
};

export enum Headers {
  Authorization = 'authorization',
  Accept = 'Accept',
}
