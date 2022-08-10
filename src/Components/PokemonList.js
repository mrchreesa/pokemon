import React, { useState } from "react";
import axios from "axios";

export default function PokemonList({
  pokemons,
  pokemonDataUrl,
  setPokemonDataUrl,
  filterByGeneration,
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
  // console.log(pokemons);
  return (
    <div className="pokemon-list-container">
      {pokemons.map((pokemon) => (
        <>
          <button
            onClick={
              () =>
                getCurrentPokemonUrl(
                  `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                )
              // () => filterByGeneration(pokemon.name)
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
