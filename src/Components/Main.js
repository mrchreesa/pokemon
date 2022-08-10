import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import PokemonItem from "./PokemonItem";
import Pagination from "./Pagination";
import Generations from "./Generations";
import SavedPokemons from "./SavedPokemons";
import axios from "axios";

export default function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDataUrl, setPokemonDataUrl] = useState(null);

  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPokemon, setCurrentPokemon] = useState(pokemons[0]);
  const [compare, setCompare] = useState(false);
  const [genPokemons, setGenPokemons] = useState([]);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(20);
  const [genId, setGenId] = useState(null);
  const [savedPokemons, setSavedPokemons] = useState([]);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemons(res.data.results.map((pokemon) => pokemon));
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setLoading(false);
      });
    filterByGeneration();

    return () => cancel();
  }, [currentPageUrl]);

  useEffect(() => {
    if (genId) filterByGeneration();
  }, [genId]);

  useEffect(() => {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));
    if (pokemons) {
      setSavedPokemons(pokemons);
    }
  }, []);
  useEffect(() => {
    if (savedPokemons?.length) {
      localStorage.setItem("pokemons", JSON.stringify(savedPokemons));
    }
  }, [savedPokemons]);

  const filterByGeneration = (id) => {
    // setLoading(true);

    setGenId(id);
    if (genId) {
      axios
        .get(`http://pokeapi.co/api/v2/generation/${genId}`)
        .then((res) => {
          setPokemons(res.data.pokemon_species.slice(startPage, endPage));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(pokemons);
  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
    setStartPage(startPage + 20);
    setEndPage(endPage + 20);
    console.log(startPage, endPage);
    if (genId) {
      filterByGeneration();
    }
  };

  const goToPreviousPage = () => {
    setCurrentPageUrl(prevPageUrl);
    setStartPage(startPage - 20);
    setEndPage(endPage - 20);
    console.log(startPage, endPage);
  };

  return (
    <div>
      {loading === true ? (
        <h1>Loading..</h1>
      ) : (
        <div className="main-container">
          <div className="main-left">
            <Generations filterByGeneration={filterByGeneration} />
            <PokemonList
              pokemons={pokemons}
              setPokemons={setPokemons}
              pokemonDataUrl={pokemonDataUrl}
              setPokemonDataUrl={setPokemonDataUrl}
              compare={compare}
              setCompare={setCompare}
            />

            <Pagination
              goToNextPage={nextPageUrl ? goToNextPage : null}
              goToPreviousPage={prevPageUrl ? goToPreviousPage : null}
              filterByGeneration={filterByGeneration}
            />
          </div>
          <div className="main-right">
            <PokemonItem
              loading={loading}
              pokemons={pokemons}
              setPokemons={setPokemons}
              pokemonDataUrl={pokemonDataUrl}
              setPokemonDataUrl={setPokemonDataUrl}
              currentPokemon={currentPokemon}
              compare={compare}
              savedPokemons={savedPokemons}
              setSavedPokemons={setSavedPokemons}
            />
          </div>
          <SavedPokemons
            savedPokemons={savedPokemons}
            setPokemonDataUrl={setPokemonDataUrl}
          />
        </div>
      )}
    </div>
  );
}
