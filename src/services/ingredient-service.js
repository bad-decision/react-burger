import { getResource } from "./core";

export default class IngredientService {
    getAll = async () => {
        return await getResource(`/ingredients`);
    };
}
