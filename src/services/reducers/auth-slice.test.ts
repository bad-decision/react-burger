/* eslint-disable no-undef */
import { IAuthState } from '../../utils/types';
import { testUser } from '../testData';
import {
  authReducer,
  getUser,
  logInUser,
  registerUser,
  initialState,
  logOutUser,
  forgotPassword,
  resetPassword,
} from './auth-slice';

describe('auth reducer', () => {
  it('should handle getUser()', () => {
    expect(authReducer({} as IAuthState, getUser(testUser))).toEqual({
      user: testUser,
    });

    expect(authReducer(initialState, getUser(testUser))).toEqual({
      ...initialState,
      user: testUser,
    });
  });

  it('should handle registerUser()', () => {
    expect(authReducer({} as IAuthState, registerUser(testUser))).toEqual({
      user: testUser,
    });

    expect(authReducer(initialState, registerUser(testUser))).toEqual({
      ...initialState,
      user: testUser,
    });
  });

  it('should handle logInUser()', () => {
    expect(authReducer({} as IAuthState, logInUser(testUser))).toEqual({
      user: testUser,
    });

    expect(authReducer(initialState, logInUser(testUser))).toEqual({
      ...initialState,
      user: testUser,
    });
  });

  it('should handle logOutUser()', () => {
    expect(authReducer({} as IAuthState, logOutUser())).toEqual({
      user: null,
    });

    expect(authReducer(initialState, logOutUser())).toEqual({
      ...initialState,
      user: null,
    });
  });

  it('should handle forgotPassword()', () => {
    expect(authReducer({} as IAuthState, forgotPassword())).toEqual({
      forgotPassword: true,
    });

    expect(authReducer(initialState, forgotPassword())).toEqual({
      ...initialState,
      forgotPassword: true,
    });
  });

  it('should handle resetPassword()', () => {
    expect(
      authReducer({ user: null, forgotPassword: true }, resetPassword())
    ).toEqual({
      user: null,
      forgotPassword: false,
    });

    expect(authReducer(initialState, resetPassword())).toEqual({
      ...initialState,
      forgotPassword: false,
    });
  });
});
