import axios from "axios";
import {
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_USER,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../Constants/constants";

export const userSignUpAction =
  (username, email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { username, password } });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/users/register`,
        { username, email, password },
        config
      );

      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
      dispatch({ type: LOG_IN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const userLoginActions = (username, password) => async (dispatch) => {
  dispatch({ type: LOG_IN_REQUEST, payload: { username, password } });
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/users/login`,
      { username, password },
      config
    );

    dispatch({ type: LOG_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOG_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const userLogOutAction = () => async (dispatch) => {
  dispatch({ type: LOG_OUT_USER });
  localStorage.removeItem("userInfo");
};

export const userDetailsActions = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: id });
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
      `http://localhost:5000/api/v1/users/${id}`,
      config
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const userUpdateActions =
  (id, username, email, password) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/users/${id}`,
        { username, email, password },
        config
      );

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      dispatch({ type: LOG_IN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
