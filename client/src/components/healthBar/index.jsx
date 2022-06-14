import React from "react";

import './healthBar.css';

const HealthBar = ({id, fighterName}) => {
  return (
    <div className="health-bar-wrapper">
      <div className="fighter-name">{fighterName}</div>
      <div className="health-bar-item">
        <div id={id} className="health-indicator"></div>
      </div>
    </div>
  )
}

export default HealthBar;