import {
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  LOG_OUT_USER,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../Constants/constants";

export const userSignUpReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true, userInfo: {} };
    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducers = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return { loading: true, userInfo: {} };
    case LOG_IN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case LOG_IN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOG_OUT_USER:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        sucess: true,
      };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
