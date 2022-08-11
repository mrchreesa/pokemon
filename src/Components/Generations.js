import React from "react";

export default function Generations({ filterByGeneration }) {
  return (
    <div className="generations-container">
      <h4>Generations </h4>
      <button className="gen-1" onClick={() => filterByGeneration(1)}>
        1
      </button>
      <button className="gen-2" onClick={() => filterByGeneration(2)}>
        2
      </button>
      <button className="gen-3" onClick={() => filterByGeneration(3)}>
        3
      </button>
      <button className="gen-4" onClick={() => filterByGeneration(4)}>
        4
      </button>
      <button className="gen-5" onClick={() => filterByGeneration(5)}>
        5
      </button>
      <button className="gen-6" onClick={() => filterByGeneration(6)}>
        6
      </button>
      <button className="gen-7" onClick={() => filterByGeneration(7)}>
        7
      </button>
      <button className="gen-8" onClick={() => filterByGeneration(8)}>
        8
      </button>
    </div>
  );
}
