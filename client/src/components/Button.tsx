interface Props {
  onClick: () => void;
  additionalCSS: string;
  children: JSX.Element | string;
}

const Button = ({ onClick, additionalCSS, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md shadow-md hover:shadow-none ${additionalCSS}`}
    >
      {children}
    </button>
  );
};

export default Button;
