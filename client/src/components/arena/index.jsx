import React from "react";
import HealthBar from "../healthBar";

import './arena.css';

const Arena = ({firstFigter, secondFighter, show}) => {
  return (
    <div style={{display: show ? 'flex' : 'none'}} className="arena-wrapper">
      <HealthBar id='left-fighter-indicator' fighterName={firstFigter?.name || ''} />
      <HealthBar id='right-fighter-indicator' fighterName={secondFighter?.name || ''} />
    </div>
  )
}

export default Arena;