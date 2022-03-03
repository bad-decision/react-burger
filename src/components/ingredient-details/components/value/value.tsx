import styles from './value.module.css';

interface IProps {
  name: string;
  value: number;
}

function Value({ name, value }: IProps) {
  return (
    <div className={`${styles.value} text_color_inactive`}>
      <span className="text text_type_main-default">{name}</span>
      <span className="text text_type_digits-default">{value}</span>
    </div>
  );
}

export default Value;
