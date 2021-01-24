import React, { createContext, useReducer, useContext } from "react";
import { API_CALL } from "../constants/actionTypes";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case API_CALL:
      console.log(action.payload);
      return {
        ...state,
        searchResults: action.payload.Search,
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    searchResults: [],
    currentResults: {
      Title: "",
      Year: "",
      imbdId: "",
    },
    savedMovies: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
