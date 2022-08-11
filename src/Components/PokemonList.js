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
      return "fddfdf";
    } else if (genId === 2) {
      return "defde0";
    }
  };
  console.log(genId);
  return (
    <div className="pokemon-list-container">
      {pokemons.map((pokemon) => (
        <>
          <button
            style={{ backgroundColor: genId == 1 ? "red" : null }}
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
