import React from "react";

const StatsRender = (props) => {
  return (
    <div>
      <h2 className="">{props.params.selectedCountry} info</h2>
      <div className="stats">
        <h3 className="stats-header">Active at this moment</h3>
        <h3 className="stats-fill">{props.params.active}</h3>
      </div>
      <div className="stats">
        <h3 className="stats-header">Cases at this moment</h3>
        <h3 className="stats-fill">{props.params.cases}</h3>
      </div>
      <div className="stats">
        <h3 className="stats-header">Deaths at this moment</h3>
        <h3 className="stats-fill">{props.params.deaths}</h3>
      </div>
      <div className="stats">
        <h3 className="stats-header">Recovered at this moment</h3>
        <h3 className="stats-fill">{props.params.recovered}</h3>
      </div>
    </div>
  );
};

export default StatsRender;