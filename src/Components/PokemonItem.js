import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokemonItem({
  pokemons,
  setPokemons,
  pokemonDataUrl,
  setPokemonDataUrl,
  compare,
  savedPokemons,
  setSavedPokemons,
}) {
  const [currentPokemon, setCurrentPokemon] = useState(pokemons[0]);
  const [comparePokemon, setComparePokemon] = useState(pokemons[0]);

  useEffect(() => {
    if (compare) {
      setCurrentPokemon((prevState) => prevState);
    } else {
      axios.get(pokemonDataUrl).then((res) => setCurrentPokemon(res.data));
    }
  }, [pokemonDataUrl]);
  console.log(pokemonDataUrl);

  useEffect(() => {
    axios.get(pokemonDataUrl).then((res) => setComparePokemon(res.data));
  }, [pokemonDataUrl]);

  // useEffect(() => {
  //   if (savedPokemons.length) {
  //     savePokeToProfie();
  //   }
  // }, [currentPokemon]);

  const savePokeToProfie = (poke) => {
    let pokeName = poke.name;
    let updatedState = savedPokemons.concat(pokeName);
    setSavedPokemons(updatedState);
  };
  console.log(currentPokemon);

  return (
    <>
      {!currentPokemon ? (
        ""
      ) : (
        <>
          {pokemonDataUrl === null ? (
            <div className="select-poke">
              {" "}
              <h1>Select your Pokemon</h1>
            </div>
          ) : (
            <div className="poke-card">
              <h1>{currentPokemon?.name}</h1>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${currentPokemon?.id}.svg`}
                alt=""
              />{" "}
              <div className="abilities">
                {currentPokemon.abilities?.map((poke) => {
                  return (
                    <>
                      <div key={poke.ability.name} className="group">
                        <h2>{poke.ability.name}</h2>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="base-stat">
                {currentPokemon.stats?.map((poke) => {
                  return (
                    <>
                      <h3>
                        {poke.stat.name}:{poke.base_stat}
                      </h3>
                    </>
                  );
                })}
              </div>
              <button
                className="btn-pokemon-list"
                onClick={() => savePokeToProfie(currentPokemon)}
              >
                Save me
              </button>
            </div>
          )}
          {!compare ? null : (
            <div className="poke-card">
              <h1>{comparePokemon?.name}</h1>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${comparePokemon?.id}.svg`}
                alt=""
              />{" "}
              <div className="abilities">
                {comparePokemon.abilities?.map((poke) => {
                  return (
                    <>
                      <div className="group">
                        <h2>{poke.ability.name}</h2>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="base-stat">
                {comparePokemon.stats?.map((poke) => {
                  return (
                    <>
                      <h3>
                        {poke.stat.name}:{poke.base_stat}
                      </h3>
                    </>
                  );
                })}
              </div>
              <button
                className="btn-pokemon-list"
                onClick={() => savePokeToProfie(comparePokemon)}
              >
                Save me
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
