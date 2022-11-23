import { Reducer, useReducer } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CheckOut from "./components/CheckOut";
import Home from "./components/Home";
import Cart from "./assets/cart.svg";
import Store from "./assets/store.svg";
import Success from "./components/Success";

const reducer: Reducer<Product[], ReducerAction> = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_PRODUCT": {
      const { id } = payload as Product;
      if (state.some((product) => product.id === id)) return state;
      return [...state, payload as Product];
    }
    case "UPDATE_PRODUCT": {
      const { index, quantity } = payload as {
        index: number;
        quantity: number;
      };
      state[index].quantity = quantity;
      return state;
    }
    case "DELETE_PRODUCT": {
      return state.filter((product) => product.id !== payload);
    }
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <>
      <nav className="p-6 flex flex-col justify-between items-center lg:flex-row">
        <h1 className="max-w-max text-center font-bold">Stripe Ecommerce with React </h1>
        <ul className="mt-4 flex gap-x-4">
          <li>
            <Link to="/">
              <img src={Store} alt="store" className="h-10 cursor-pointer" />
            </Link>
          </li>
          <li className="relative">
            <span className="absolute -top-1 -right-1 p-1 rounded-full bg-blue-600 text-xs font-semibold pointer-events-none">
              {state.length < 10 ? `0${state.length}` : state.length}
            </span>
            <Link to="/checkout">
              <img src={Cart} alt="cart" className="h-10 cursor-pointer" />
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<Home dispatch={dispatch} />} />
        <Route
          path="/checkout"
          element={<CheckOut state={state} dispatch={dispatch} />}
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
};

export default App;
