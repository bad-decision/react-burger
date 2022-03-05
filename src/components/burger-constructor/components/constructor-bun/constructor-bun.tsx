import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientDetails } from '../../../../utils/types';

interface IProps {
  bun: IIngredientDetails;
  type: 'top' | 'bottom' | undefined;
}

function ConstructorBun({ bun, type }: IProps) {
  const { image_mobile: imageMobile, price, name } = bun;
  const text = `${name} ${type === 'top' ? '(верх)' : '(низ)'}`;

  return (
    <div className="pl-8">
      <ConstructorElement
        type={type}
        isLocked
        text={text}
        price={price}
        thumbnail={imageMobile}
      />
    </div>
  );
}

export default ConstructorBun;
