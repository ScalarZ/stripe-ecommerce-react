import { Dispatch } from "react";
import { useMutation } from "react-query";
import ProductCheckOutCard from "./ProductCheckOutCard";

interface Props {
  state: Product[];
  dispatch: Dispatch<ReducerAction>;
}
const CheckOut = ({ state, dispatch }: Props) => {
  const redirect = (url: string) => {
    location.replace(url);
  };

  const createCheckOut = useMutation(state, () =>
    fetch(import.meta.env.VITE_STRIPE_CHECKOUT_API, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ products: state }),
    })
      .then((res) => res.json())
      .then(({ url }: { url: string }) => redirect(url))
  );

  return (
    <div className="p-6">
      <div className="mb-6 text-center text-lg">
        {state.length === 0 ? (
          <p>No selected items</p>
        ) : (
          <p>
            For payment testing, type <b className="text-blue-600">4242 4242 4242 4242</b> as a visa card, and
            enter a random information in the other fields
          </p>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-y-4">
        {state?.map((product, index) => (
          <ProductCheckOutCard
            key={product.id}
            index={index}
            product={product}
            dispatch={dispatch}
          />
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        {state.length !== 0 ? (
          <button
            className="bg-blue-800 flex items-center"
            onClick={() => {
              createCheckOut.mutate();
            }}
          >
            checkout
            {createCheckOut.isLoading ? (
              <span className="ml-2 h-4 w-4 border-2 border-white border-dashed rounded-full animate-spin"></span>
            ) : null}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CheckOut;
