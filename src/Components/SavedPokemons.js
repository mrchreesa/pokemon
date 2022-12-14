import React from "react";

export default function SavedPokemons({ savedPokemons, setPokemonDataUrl }) {
  const getCurrentPokemonUrl = (url) => {
    setPokemonDataUrl(url);
  };
  return (
    <>
      {savedPokemons.length ? (
        <div className="saved-title">
          <h1>My Pokemons</h1>
        </div>
      ) : null}

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
    </>
  );
}
