import { useQuery } from "react-query";
import ProductCard from "./ProductCard";
import { Dispatch, useEffect } from "react";

const useProudcts = () => {
  const fetchData = async (): Promise<Product[]> => {
    return fetch(import.meta.env.VITE_STRIPE_PRODUCT_API).then((res) =>
      res.json()
    );
  };

  return useQuery<Product[], Error>("products", fetchData);
};

interface Props {
  dispatch: Dispatch<ReducerAction>;
}

const Home = ({ dispatch }: Props) => {
  const { data, isLoading, isError, isFetching } = useProudcts();

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;

  if (isError)
    return <p className="p-8 text-center">Error while loading the data</p>;

  return (
    <div className="mx-auto px-8 max-w-7xl">
      <ul className="grid grid-cols-1 gap-y-6 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} dispatch={dispatch} />
        ))}
      </ul>
      {isFetching ? <p className="p-8 text-center">Fetching...</p> : null}
    </div>
  );
};

export default Home;
