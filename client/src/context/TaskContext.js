import React, { createContext, useReducer } from "react";

export const TaskContext = createContext();

const initialState = {
  isLogin: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {   
    case "USER_LOADED":
      console.log("USER_LOADED");
     // localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      console.log("LOGIN_FAIL");
      return {
        ...state,
        isLogin: false,
        user: null,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS");
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isLogin: true,
        loading: false,
      };
    case "LOGOUT":
      console.log("LOGOUT");
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    default:
      throw new Error();
  }
};

export const TaskContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={[state, dispatch]}>
      {props.children}
    </TaskContext.Provider>
  );
};
