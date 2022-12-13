import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstant.js";
import {
  CREATE_MENU_FAIL,
  CREATE_MENU_REQUEST,
  CREATE_MENU_SUCCESS,
} from "../constants/menuConstants.js";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/users/login",
      { email, password },
      config
    );
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const createMenu = (id, story) => async (dispatch) => {
  try {
    const { data } = await api.updateStory(id, story);

    dispatch({ type: UPDATE_STORY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
// export const menu =
// (age, height, weight, gender, health, purpuse) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CREATE_MENU_REQUEST,
//     });

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "/api/users/menu",
//       { age, height, weight, gender, health, purpuse },
//       config
//     );

//     dispatch({
//       type: CREATE_MENU_SUCCESS,
//       payload: data,
//     });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: CREATE_MENU_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
