import {
  ADD_TO_CART_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_FAIL,
  FEATURED_PRODUCT_REQUEST,
  FEATURED_PRODUCT_SUCCESS,
  HOT_PRODUCT_FAIL,
  HOT_PRODUCT_REQUEST,
  HOT_PRODUCT_SUCCESS,
  NEW_ARRIVAL_PRODUCT_FAIL,
  NEW_ARRIVAL_PRODUCT_REQUEST,
  NEW_ARRIVAL_PRODUCT_SUCCESS,
  REMOVE_FROM_CART,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SAVE_SHIPPING_INFO,
  ORDER_COMPLETE_AND_RESET_CART,
} from "../Constants/constants";

export const featuredProductReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case FEATURED_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case FEATURED_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        result: action.payload.result,
        resultPerPage: action.payload.resultPerPage,
      };
    case FEATURED_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allProductReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        result: action.payload.result,
        resultPerPage: action.payload.resultPerPage,
        colors: action.payload.colors,
      };
    case ALL_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const arrivalProductReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case NEW_ARRIVAL_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case NEW_ARRIVAL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case NEW_ARRIVAL_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const hotProductReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case HOT_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case HOT_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case HOT_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleProductReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { loading: true, products: {} };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addToCartReducers = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const existProduct = state.cartItems.find((pd) => pd._id === item._id);
      if (existProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((pd) =>
            pd._id === existProduct._id ? item : pd
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((pd) => pd._id !== action.payload),
      };
    case ORDER_COMPLETE_AND_RESET_CART:
      return { ...state, cartItems: [] };
    case SAVE_SHIPPING_INFO:
      return { ...state, shippingInfo: action.payload };
    default:
      return state;
  }
};
