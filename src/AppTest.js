import React, { useState, useReducer } from "react";
import "./App.css";

import { Pie } from "react-chartjs-2";

const initialState = {
  casesAmount: "",
  deathAmount: "",
  recoveredAmount: "",
  activeAmount: "",
  countryInput: "",
  showChart: true,
  selectedInfo: "",
  selectedCountry: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_BY_COUNTRY":
      return {
        ...state,
        casesAmount: '',
        deathAmount: '',
        recoveredAmount: '',
        activeAmount: '',
        countryInput: '',
        showChart: true,
        selectedInfo: "",
        selectedCountry: ""
      };
  }
};

const App = () => {
  //const CORONA_API = "https://coronavirus-19-api.herokuapp.com/all";

  const [state, dispatch] = useReducer(reducer, initialState);
    // const [casesAmount, setCasesAmount] = useState("");
    // const [deathAmount, setDeathAmount] = useState("");
    // const [recoveredAmount, setRecoveredAmount] = useState("");
    // const [activeAmount, setActiveAmount] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [showChart, setShowChart] = useState(true);
    const [selectedInfo, setSelectedInfo] = useState("getAll");
    const [selectedCountry, setSelectedCountry] = useState("");

  //const [country, setCountry] = useState("");
  //const [countrySelect, setCountrySelect] = useState("");

  //запрос через .then, был заменен на try catch
  // fetch("https://coronavirus-19-api.herokuapp.com/countries/Ukraine")
  //   .then(response => response.json())
  //   .then(jsonResponse => {
  //     setIllAmount(jsonResponse.cases);
  //     setRecoveredAmount(jsonResponse.deaths);
  //     setDeathAmount(jsonResponse.recovered);
  //   });

  //chart beg
//   const Chart = () => {
//     const chartData = {
//       labels: ["Active", "Cases", "Deaths", "Recovered"],
//       datasets: [
//         {
//           data: [activeAmount, casesAmount, deathAmount, recoveredAmount],
//           backgroundColor: [
//             "rgb(241, 10, 10)",
//             "rgba(255, 99, 132, 0.6)",
//             "rgb(100, 98, 98)",
//             "rgb(31, 207, 31)"
//           ]
//         }
//       ]
//     };
//     return (
//       <div>
//         {/* <CanvasJSChart options={options} /> */}
//         <h2>
//           {selectedInfo === "getAll" ? "World info" : selectedCountry + " info"}
//         </h2>
//         <Pie
//           data={chartData}
//           width={300}
//           height={300}
//           options={{ maintainAspectRatio: false }}
//         />
//       </div>
//     );
//   };

  //chart end

  const getByCountry = async country => {
    try {
      const response = await fetch(
        `https://coronavirus-19-api.herokuapp.com/countries/${country}`
      );
      const { cases, recovered, deaths, active } = await response.json();
    //   setCasesAmount(cases);
    //   setRecoveredAmount(recovered);
    //   setDeathAmount(deaths);
    //   setActiveAmount(active);
    dispatch({ type: "SEARCH_BY_COUNTRY"})
    } catch (err) {
      console.log(err.message);
      return {};
    }
  };

//   const getAll = async () => {
//     try {
//       const response = await fetch`https://coronavirus-19-api.herokuapp.com/countries/World`;
//       const { cases, recovered, deaths, active } = await response.json();
//       setRecoveredAmount(recovered);
//       setCasesAmount(cases);
//       setDeathAmount(deaths);
//       setActiveAmount(active);
//       setSelectedInfo("getAll");
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

  const resetInput = () => {
    setCountryInput("");
  };

  const handleInput = e => {
    setCountryInput(e.target.value.toUpperCase());
  };

  const findCorona = e => {
    e.preventDefault();
    getByCountry(countryInput.trim());
    setSelectedCountry(countryInput);
    resetInput();
    setSelectedInfo("getByCountry");
  };

  const RenderByInput = () => {
    if (selectedInfo === "getAll") {
      getAll();
      return (
        <div>
          <h2 className="">World info</h2>
          <div className="stats">
            <h3 className="stats-header">Active at this moment</h3>
            <h3 className="stats-fill">{activeAmount}</h3>
          </div>
          <div className="stats">
            <h3 className="stats-header">Cases at this moment</h3>
            <h3 className="stats-fill">{casesAmount}</h3>
          </div>
          <div className="stats">
            <h3 className="stats-header">Deaths at this moment</h3>
            <h3 className="stats-fill">{deathAmount}</h3>
          </div>
          <div className="stats">
            <h3 className="stats-header">Recovered at this moment</h3>
            <h3 className="stats-fill">{recoveredAmount}</h3>
          </div>
        </div>
      );
    } else if (selectedInfo === "getByCountry") {
      return (
        <div>
          <h2> {selectedCountry} info</h2>
          <div className="stats">
            <h3 className="stats-header">Active at this moment</h3>
            <h3 className="stats-fill">{activeAmount}</h3>
          </div>
          <div className="stats">
            <h3 className="stats-header">Cases at this moment</h3>
            <h3 className="stats-fill">{casesAmount}</h3>
          </div>
          <div className="stats">
            <h3 className="stats-header">Deaths at this moment</h3>
            <h3 className="stats-fill">{deathAmount}</h3>
          </div>
          <div className="stats">
            <h3 className="stats-header">Recovered at this moment</h3>
            <h3 className="stats-fill">{recoveredAmount}</h3>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <h1 className="header">COVID-19 SUCKS</h1>

      <button onClick={getAll} className="world-button">
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
          onClick={findCorona}
          value="FUCK IT"
        ></input>
      </div>
      <button className="world-button" onClick={() => setShowChart(!showChart)}>
        {!showChart ? "Show stats" : "Show chart"}
      </button>
      {!showChart ? <Chart /> : <RenderByInput />}
    </div>
  );
};

export default App;
