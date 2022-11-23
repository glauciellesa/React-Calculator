import './Screen.css';

// eslint-disable-next-line react/prop-types
const Screen = ({ children }) => {
  return (
    <section className="screen">
      <span id="result">{children}</span>
    </section>
  );
};

export default Screen;
