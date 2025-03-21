export const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";
const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_ROL = "SET_ROL";

export const setRol = (rol) => ({
  type: SET_ROL,
  payload: rol,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case REMOVE_TOKEN:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("rol");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    case SET_ROL:
      localStorage.setItem("rol", action.payload);
      return {
        ...state,
        user: { ...state.user, rol: action.payload },
      };
    default:
      return state;
  }
};

export default authReducer;
