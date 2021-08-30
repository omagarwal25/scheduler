interface Props {
  onClick: () => void;
  text: string;
  additionalCSS: string;
}

const Button = ({ onClick, text, additionalCSS }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md shadow-md  hover:shadow-none ${additionalCSS}`}
    >
      {text}
    </button>
  );
};

export default Button;
