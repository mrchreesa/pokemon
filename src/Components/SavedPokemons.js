import React from "react";

export default function SavedPokemons({ savedPokemons, setPokemonDataUrl }) {
  const getCurrentPokemonUrl = (url) => {
    setPokemonDataUrl(url);
  };
  return (
    <div className="saved-pokemon-list-container saved">
      {savedPokemons?.map((pokemon) => (
        <>
          <button
            onClick={
              () =>
                getCurrentPokemonUrl(
                  `https://pokeapi.co/api/v2/pokemon/${pokemon}`
                )
              // () => filterByGeneration(pokemon.name)
            }
            className="saved-btn"
          >
            <div key={pokemon}>{pokemon}</div>
          </button>
        </>
      ))}
    </div>
  );
}
