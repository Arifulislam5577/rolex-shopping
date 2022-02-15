import {
  ADD_TO_CART_SUCCESS,
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
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  SAVE_SHIPPING_INFO,
} from "../Constants/constants";
import axios from "axios";

export const featuredAction = () => async (dispatch) => {
  try {
    dispatch({ type: FEATURED_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products?base=sale`
    );

    dispatch({
      type: FEATURED_PRODUCT_SUCCESS,
      payload: {
        products: data.products,
        totalProducts: data.totalProducts,
        result: data.result,
        resultPerPage: data.resultPerPage,
      },
    });
  } catch (error) {
    dispatch({
      type: FEATURED_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const allProductAction =
  (keyword = " ", pageNum = 1, price = 5000, color) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let api = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${pageNum}&price[lte]=${price}`;

      if (color) {
        api = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${pageNum}&price[lte]=${price}&color=${color}`;
      }

      const { data } = await axios.get(api);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: {
          products: data.products,
          totalProducts: data.totalProducts,
          result: data.result,
          resultPerPage: data.resultPerPage,
          colors: data.colors,
        },
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const arrivalAction = () => async (dispatch) => {
  try {
    dispatch({ type: NEW_ARRIVAL_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products?base=new`
    );

    dispatch({
      type: NEW_ARRIVAL_PRODUCT_SUCCESS,
      payload: {
        products: data.products,
      },
    });
  } catch (error) {
    dispatch({
      type: NEW_ARRIVAL_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const hotProductAction = () => async (dispatch) => {
  try {
    dispatch({ type: HOT_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products?base=hot`
    );

    dispatch({
      type: HOT_PRODUCT_SUCCESS,
      payload: {
        products: data.products,
      },
    });
  } catch (error) {
    dispatch({
      type: HOT_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const singleProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`
    );

    dispatch({
      type: SINGLE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const addToCartAction =
  (id, qty = 1) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`
    );

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: {
        _id: data._id,
        title: data.title,
        price: data.price,
        rating: data.rating,
        stock: data.stock,
        countReview: data.countReview,
        color: data.screenColor,
        url: data.url,
        base: data.base,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().addToCartProducts.cartItems)
    );
  };

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: id });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().addToCartProducts.cartItems)
  );
};

export const shippingInfoActions = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
