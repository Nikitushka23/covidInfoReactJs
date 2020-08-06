import React, { useReducer, useState } from "react";
import { Pie } from "react-chartjs-2";
import useCovidAPI from "../reducer";
import './Chart.css'

const Chart = (props) => {
  const [selectedInfo, setSelectedInfo] = useState("getAll");
  const [selectedCountry, setSelectedCountry] = useState("");
  const chartData = {
    labels: ["Active", "Cases", "Deaths", "Recovered"],
    datasets: [
      {
        data: [
          props.params.active,
          props.params.cases,
          props.params.deaths,
          props.params.recovered,
        ],
        backgroundColor: [
          "rgb(241, 10, 10)",
          "rgba(255, 99, 132, 0.6)",
          "rgb(100, 98, 98)",
          "rgb(31, 207, 31)",
        ],
      },
    ],
  };
  return (
    <div className="chart">
      {<h2>{props.params.selectedCountry + " info"}</h2>}
      <div className="chart-pie">
      <Pie
        data={chartData}
        width={300}
        height={300}
        options={{ maintainAspectRatio: false }}
      />
      </div>
    </div>
  );
};

export default Chart;
