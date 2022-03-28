/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { IBurgerConstructorState } from '../../utils/types';
import { testIngredient1, testIngredient2, testIngredient3 } from '../testData';
import {
  setBun,
  addInsideIngredient,
  initialState,
  removeInsideIngredient,
  swapInsideIngredients,
  clearConstructor,
  burgerConstructorReducer as reducer,
} from './burger-constructor-slice';

describe('burger constructor reducer', () => {
  it('should handle setBun()', () => {
    expect(
      reducer({} as IBurgerConstructorState, setBun(testIngredient1))
    ).toEqual({
      bun: testIngredient1,
    });

    expect(reducer(initialState, setBun(testIngredient1))).toEqual({
      bun: testIngredient1,
      insideItems: [],
    });
  });

  it('should handle addInsideIngredient()', () => {
    expect(reducer(initialState, addInsideIngredient(testIngredient1))).toEqual(
      {
        bun: null,
        insideItems: [testIngredient1],
      }
    );

    expect(
      reducer(
        { bun: testIngredient1, insideItems: [testIngredient1] },
        addInsideIngredient(testIngredient2)
      )
    ).toEqual({
      bun: testIngredient1,
      insideItems: [testIngredient1, testIngredient2],
    });
  });

  it('should handle removeInsideIngredient()', () => {
    expect(
      reducer(
        {
          bun: testIngredient1,
          insideItems: [testIngredient2, testIngredient1],
        },
        removeInsideIngredient('2_02.01.01')
      )
    ).toEqual({
      bun: testIngredient1,
      insideItems: [testIngredient1],
    });
  });

  it('should handle swapInsideIngredients()', () => {
    expect(
      reducer(
        {
          bun: testIngredient1,
          insideItems: [testIngredient1, testIngredient2, testIngredient3],
        },
        swapInsideIngredients({ index1: 0, index2: 2 })
      )
    ).toEqual({
      bun: testIngredient1,
      insideItems: [testIngredient3, testIngredient2, testIngredient1],
    });
  });

  it('should handle clearConstructor()', () => {
    expect(reducer(initialState, clearConstructor())).toEqual(initialState);
  });
});
