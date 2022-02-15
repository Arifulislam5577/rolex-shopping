import axios from "axios";
import {
  ADMIN_ORDER_FAIL,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  ORDER_COMPLETE_AND_RESET_CART,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_RESET,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  USER_ORDER_FAIL,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
} from "../Constants/constants";

export const orderCreate = (newOrder) => async (dispatch, getState) => {
  dispatch({ type: NEW_ORDER_REQUEST, payload: newOrder });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/order`,
      newOrder,
      config
    );

    dispatch({ type: NEW_ORDER_SUCCESS, payload: data });
    dispatch({ type: ORDER_COMPLETE_AND_RESET_CART });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: NEW_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getOrder = (id) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/order/${id}`,

      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const OrderUpdate =
  (id, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/order/${id}`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
      dispatch({ type: ORDER_RESET });
    } catch (error) {
      dispatch({
        type: ORDER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const getUserOrder = () => async (dispatch, getState) => {
  dispatch({ type: USER_ORDER_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/order`,
      config
    );

    dispatch({ type: USER_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getAllOrder = () => async (dispatch, getState) => {
  dispatch({ type: ADMIN_ORDER_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/order/admin`,
      config
    );

    dispatch({ type: ADMIN_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
