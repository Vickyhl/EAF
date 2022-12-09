import {
  CREATE_MENU_FAIL,
  CREATE_MENU_REQUEST,
  CREATE_MENU_SUCCESS,
} from "../constants/menuConstants";

export const userMenuReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MENU_REQUEST:
      return { loading: true };
    case CREATE_MENU_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case CREATE_MENU_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
