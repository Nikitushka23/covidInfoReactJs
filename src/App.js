import React, { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart";
import useCovidAPI from "./reducer";
import getByCountry from "./functions/getByCountry";
import StatsRender from "./components/Render";

const App = (props) => {
  const [state, dispatch] = useCovidAPI();
  const [countryInput, setCountryInput] = useState("");
  const [showChart, setShowChart] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");

  let {
    countryData: { country, cases, recovered, deaths, active },
  } = state;

  const params = {
    cases: state.countryData.cases,
    recovered: state.countryData.recovered,
    deaths: state.countryData.deaths,
    active: state.countryData.active,
    selectedCountry: selectedCountry,
  };

  const resetInput = () => {
    setCountryInput("");
  };

  const handleInput = (e) => {
    setCountryInput(e.target.value.toUpperCase());
  };

  const findCorona = async (e) => {
    e.preventDefault();
    dispatch(getByCountry(countryInput.trim()));
    setSelectedCountry(countryInput);
    resetInput();
  };
  const findWorldCorona = async (e) => {
    dispatch(getByCountry("World"));
    setSelectedCountry("World");
  };
  useEffect(() => {
    dispatch(getByCountry("World"));
    setSelectedCountry("World");
  }, []);
  
  return (
    <div className="App">
      <div className="interaction">
      <h1 className="header">COVID-19 INFO</h1>
      <button onClick={findWorldCorona} className="world-button">
        World info
      </button>
      <div className="some-text">Or find yours</div>
      <div className="input-field">
        <input
          className="input-first"
          type="text"
          placeholder="choose your country"
          onChange={handleInput}
          value={countryInput}
        ></input>
        <input
          className="input-second"
          type="submit"
          onKeyPress={findCorona} 
          onClick={findCorona}
          value="FIND IT"
        ></input>
      </div>
      <button className="world-button" onClick={() => setShowChart(!showChart)}>
        {!showChart ? "Show stats" : "Show chart"}
      </button>
      </div>
      {!showChart ? <Chart params={params} /> : <StatsRender params={params} />}
    </div>
  );
};

export default App;
