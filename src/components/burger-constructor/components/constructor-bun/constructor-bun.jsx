import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ConstructorBunType } from "../../../../utils/types";

const ConstructorBun = ({ bun, type }) => {
	const { image_mobile, price, name } = bun;
	const text = `${name} ${type === "top" ? "(верх)" : "(низ)"}`;

	return (
		<div className="pl-8">
			<ConstructorElement
				type={type}
				isLocked
				text={text}
				price={price}
				thumbnail={image_mobile}
			/>
		</div>
	);
};

ConstructorBun.propTypes = {
	bun: PropTypes.shape(ConstructorBunType).isRequired,
	type: PropTypes.string.isRequired,
};

export default ConstructorBun;
