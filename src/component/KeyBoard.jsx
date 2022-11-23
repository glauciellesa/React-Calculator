import './KeyBoard.css';

// eslint-disable-next-line react/prop-types
const KeyBoard = ({ children }) => {
  return (
    <section id="buttons" className="buttonBox">
      {children}
    </section>
  );
};

export default KeyBoard;
