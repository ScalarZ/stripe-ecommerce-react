import { Dispatch, useState } from "react";

interface Props {
  index: number;
  product: Product;
  dispatch: Dispatch<ReducerAction>;
}

const ProductCheckOutCard = ({ product, index, dispatch }: Props) => {
  const [options] = useState<number[]>([1, 2, 3, 4, 5]);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLSelectElement;
    setQuantity(Number(target.value));
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: {
        index,
        quantity: Number(target.value),
      },
    });
  };

  const removeProduct = () => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: product.id,
    });
  };

  return (
    <div className="overflow-hidden p-4 bg-gray-800 rounded-lg border-white flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-28 rounded-lg aspect-square object-cover"
          loading="lazy"
        />
        <div className="ml-4 space-y-2">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <span className="text-lg font-medium">
            {new Intl.NumberFormat(`en-US`, {
              currency: product.metadata.currency,
              style: "currency",
            }).format(product.metadata.price)}
          </span>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <select
          value={quantity}
          className="p-1 bg-stone-900"
          onChange={handleQuantity}
        >
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button onClick={removeProduct}>remove</button>
      </div>
    </div>
  );
};

export default ProductCheckOutCard;
