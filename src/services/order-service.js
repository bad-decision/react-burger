import { postResource } from "./core";

export default class OrderService {
    setOrder = async (data) => {
        return await postResource(`/orders`, data);
    };
}
