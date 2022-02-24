import PropTypes from 'prop-types';
import styles from './value.module.css';

function Value({ name, value }) {
  return (
    <div className={`${styles.value} text_color_inactive`}>
      <span className="text text_type_main-default">{name}</span>
      <span className="text text_type_digits-default">{value}</span>
    </div>
  );
}

Value.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Value;
