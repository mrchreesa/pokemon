import React from "react";

export default function Generations({ filterByGeneration }) {
  return (
    <div className="generations-container">
      <h4>Generations </h4>
      <button onClick={() => filterByGeneration(1)}>1</button>
      <button onClick={() => filterByGeneration(2)}>2</button>
      <button onClick={() => filterByGeneration(3)}>3</button>
      <button onClick={() => filterByGeneration(4)}>4</button>
      <button onClick={() => filterByGeneration(5)}>5</button>
      <button onClick={() => filterByGeneration(6)}>6</button>
      <button onClick={() => filterByGeneration(7)}>7</button>
      <button onClick={() => filterByGeneration(8)}>8</button>
    </div>
  );
}
