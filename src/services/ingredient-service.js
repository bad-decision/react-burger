import { getResource } from "./core";

class IngredientService {
    getAll = async () => {
        return await getResource(`/ingredients`);
    };
}

const ingredientService = new IngredientService();

export default ingredientService;
