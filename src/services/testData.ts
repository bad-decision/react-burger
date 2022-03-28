/* eslint-disable camelcase */
import {
  IHasUser,
  IIngredientDetails,
  ILogin,
  IMessage,
  IOrder,
  IRegisterQuery,
  IUserAuth,
  TMakeOrderBody,
} from '../utils/types';

export const testIngredient1: IIngredientDetails = {
  calories: 1,
  carbohydrates: 2,
  fat: 3,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile',
  name: 'name',
  price: 4,
  proteins: 5,
  type: 'bun',
  _id: '1',
  _hash: '1_01.01.01',
};

export const testIngredient2: IIngredientDetails = {
  calories: 1,
  carbohydrates: 2,
  fat: 3,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile',
  name: 'name',
  price: 4,
  proteins: 5,
  type: 'main',
  _id: '2',
  _hash: '2_02.01.01',
};

export const testIngredient3: IIngredientDetails = {
  calories: 1,
  carbohydrates: 2,
  fat: 3,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile',
  name: 'name',
  price: 4,
  proteins: 5,
  type: 'main',
  _id: '3',
  _hash: '3_02.01.01',
};

export const testMessage: IMessage = {
  success: true,
  orders: [
    {
      ingredients: ['test'],
      _id: '123',
      status: 'done',
      number: 1,
      name: 'test',
      createdAt: '01.01.01',
      updatedAt: '02.01.01',
    },
  ],
  total: 1,
  totalToday: 2,
};

export const testError = new Event('ws error', {
  bubbles: true,
  cancelable: false,
});

export const makeOrderBody: TMakeOrderBody = {
  ingredients: ['1', '2'],
};

export const makeOrderResult = { order: { number: 1 } };

export const testUser = {
  email: 'test@test.com',
  name: 'test',
};

export const userResult: IHasUser = {
  user: testUser,
};

export const updateUserBody: IRegisterQuery = {
  name: 'test',
  email: 'test@test.ru',
  password: 'test',
};

export const passwordResetBody = {
  email: 'test@test.ru',
};

export const resetPasswordResetBody = {
  password: '123',
  token: '321',
};

export const registerUser: IUserAuth = {
  user: {
    email: 'test@test.ru',
    name: 'test',
  },
  accessToken: '123',
  refreshToken: '321',
};

export const loginBody: ILogin = {
  email: 'test@test.ru',
  password: 'test',
};

export const tokenBody = {
  token: '123',
};

export const orderResult: IOrder = {
  ingredients: ['1', '2'],
  _id: '1234',
  status: 'done',
  number: 1,
  name: 'burger',
  createdAt: '01.01.01',
  updatedAt: '01.01.01',
};
