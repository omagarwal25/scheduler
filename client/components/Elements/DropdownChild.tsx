interface Props {
  onClick: () => void;
  value: string;
}

const DropdownChild = ({ onClick, value }: Props) => {
  return (
    <div onClick={onClick} className="border-t border-gray-500">
      <h1>{value}</h1>
    </div>
  );
};

export default DropdownChild;
