/* eslint-disable react/prop-types */
import './Button.css';

const Button = (props) => {
  return (
    <button value={props.value} className={props.className} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default Button;
