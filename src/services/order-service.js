import { postResource } from "./core";

class OrderService {
    setOrder = async (data) => {
        return await postResource(`/orders`, data);
    };
}

const orderService = new OrderService();

export default orderService;
