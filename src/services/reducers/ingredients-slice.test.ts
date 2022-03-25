/* eslint-disable camelcase */
/* eslint-disable no-undef */
import {
  setIngredientDetails,
  initialState,
  burgerIngredientsReducer as reducer,
} from './ingredients-slice';

const testIngredient = {
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

describe('burger ingredients reducer', () => {
  it('should handle setIngredientDetails()', () => {
    expect(
      reducer({ ingredientDetails: testIngredient }, setIngredientDetails(null))
    ).toEqual({
      ingredientDetails: null,
    });

    expect(reducer(initialState, setIngredientDetails(testIngredient))).toEqual(
      {
        ingredientDetails: testIngredient,
      }
    );
  });
});
