import { Dispatch } from "react";

interface Props {
  product: Product;
  dispatch: Dispatch<ReducerAction>;
}

const ProductCard = ({ product, dispatch }: Props) => {
  const addProduct = () => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  };

  return (
    <div className="overflow-hidden bg-gray-800 rounded-lg border-white ">
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-64 aspect-square object-cover"
        loading="lazy"
      />
      <div className="mt-2 p-2 space-y-2">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <span className="text-lg font-medium">
          {new Intl.NumberFormat(`en-US`, {
            currency: product.metadata.currency,
            style: "currency",
          }).format(product.metadata.price)}
        </span>
        <button className="w-full" onClick={addProduct}>
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
