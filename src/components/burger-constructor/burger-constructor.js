import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ConstructorIngredientType } from "../../utils/types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ data }) => {
    const bun = data.filter((x) => x.type === "bun")[0];
    const inside = data.filter((x) => x.type !== "bun");
    const [isOpenModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <section className={`${styles.section} pt-25 pl-4 pr-4`}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
                className="mb-10"
            >
                <div className="pl-8">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>

                <div className={`${styles.items} custom-scroll`}>
                    {inside.map((item) => {
                        return (
                            <div className={styles.item} key={item._id}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="pl-8">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
            </div>

            <div className={styles.order}>
                <span className="text text_type_digits-medium mr-10">
                    610 <CurrencyIcon type="primary" />
                </span>

                <Button
                    type="primary"
                    size="large"
                    onClick={() => setOpenModal(true)}
                >
                    Оформить заказ
                </Button>
            </div>

            {isOpenModal && (
                <Modal closeModal={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(ConstructorIngredientType))
        .isRequired,
};

export default BurgerConstructor;
