interface Props {
  onClick: () => void;
  additionalCSS?: string;
  children: JSX.Element | string;
  title?: string;
}

const Button = ({ onClick, additionalCSS, children, title }: Props) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`transition ease-in-out duration-300 transform p-2 rounded-md shadow-md hover:shadow-none ${additionalCSS}`}
    >
      {children}
    </button>
  );
};

export default Button;
