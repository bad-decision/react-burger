export interface IResponse<T> {
  data?: T;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IOrderResponse {
  order: {
    number: number;
  };
}

// export type BunType = 'top' | 'bottom' | undefined;

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

export interface IBurgerConstructorState {
  bun: IIngredientDetails | null;
  insideItems: IIngredientDetails[];
}

export interface IBurgerIngredient {
  ingredientDetails: IIngredientDetails | null;
}

export interface IHasUser {
  user: IUser | null;
  success: boolean;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IAuthState {
  user: IUser | null;
  forgotPassword: boolean;
}
