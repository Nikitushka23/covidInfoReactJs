import { useCallback, useReducer, useEffect } from "react";

import getAll from "./functions/getAll";
import getByCountry from "./functions/getByCountry";

import Chart from "./components/Chart";

const initialState = {
  worldData: {},
  countryData: {},
  isCountrySelected: false,
};

const reducer = (state, { type, payload }) => {
  console.log("hui");
  switch (type) {
    case "find":
      return { ...state, countryData: payload };
    // case "worldInfo":
    //   return { ...state, worldData: payload, isCountrySelected: false };
    default:
      throw new Error(`not implemented action for ${type}`);
  }
};

const useThunk = ([state, dispatch]) => {
  const dispatcher = useCallback(
    (action) => {
      return typeof action === "function"
        ? action(dispatcher, state)
        : dispatch(action);
    },
    [dispatch, state]
  );
  return [state, dispatcher];
};

const useCovidAPI = () => {
  const [state, dispatch] = useThunk(useReducer(reducer, initialState));
  useEffect(() => {
    const { countryData } = state;
      dispatch(getByCountry("World"));   
  }, []);
  return [state, dispatch];
};

export { reducer, useThunk };
export default useCovidAPI;
