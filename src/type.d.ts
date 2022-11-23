interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: string;
  metadata: {
    currency: string;
    price: number;
  };
  quantity: number;
}

type ReducerActionType = "ADD_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT";

interface AddProductAction {
  type: ReducerActionType;
  payload: Product;
}

interface UpdateProductAction {
  type: ReducerActionType;
  payload: {
    index: number;
    quantity: number;
  };
}

interface DeleteProductAction {
  type: ReducerActionType;
  payload: string;
}

type ReducerAction =
  | AddProductAction
  | DeleteProductAction
  | UpdateProductAction;
