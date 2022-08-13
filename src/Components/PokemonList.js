import React, { useState } from "react";
import axios from "axios";

export default function PokemonList({
  pokemons,
  pokemonDataUrl,
  setPokemonDataUrl,
  genId,
  getPokemon,
  compare,
  setCompare,
  pokemonsByGen,
}) {
  const getCurrentPokemonUrl = (url) => {
    setPokemonDataUrl(url);
    console.log(pokemonDataUrl);
  };
  const compareToggle = () => {
    setCompare(!compare);
    console.log(compare);
  };

  const colourSwitch = () => {
    if (genId === 1) {
      return "#fddfdf";
    } else if (genId === 2) {
      return "#defde0";
    } else if (genId === 3) {
      return "#fcf7de";
    } else if (genId === 4) {
      return "#def3fd";
    } else if (genId === 5) {
      return "#f4e7da";
    } else if (genId === 6) {
      return "#d5d5d4";
    } else if (genId === 7) {
      return "#fceaff";
    } else if (genId === 8) {
      return "#eaeda1";
    }
  };
  console.log(genId);
  return (
    <div className="pokemon-list-container">
      {genId === null
        ? pokemons.map((pokemon) => (
            <>
              <button
                // style={{ backgroundColor: genId == 1 ? "red" : null }}
                onClick={() =>
                  getCurrentPokemonUrl(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                  )
                }
                className="btn-pokemon-list"
              >
                <div key={pokemon.name}>{pokemon.name}</div>
              </button>
            </>
          ))
        : pokemonsByGen.map((pokemon) => (
            <>
              <button
                style={{ backgroundColor: colourSwitch() }}
                onClick={() =>
                  getCurrentPokemonUrl(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                  )
                }
                className="btn-pokemon-list"
              >
                <div key={pokemon.name}>{pokemon.name}</div>
              </button>
            </>
          ))}
      <button onClick={compareToggle} className="btn-pokemon-list compare">
        compare
      </button>
    </div>
  );
}
