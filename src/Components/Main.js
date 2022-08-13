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
  const [postsPerPage, setPostPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsByGen, setPokemonsByGen] = useState([]);
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

    return () => cancel();
  }, [currentPageUrl]);

  useEffect(() => {
    filterByGeneration();
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

    if (id) {
      axios
        .get(`http://pokeapi.co/api/v2/generation/${id}`)
        .then((res) => {
          setPokemonsByGen(res.data.pokemon_species);
          setGenId(id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemonsByGen.slice(indexOfFirstPost, indexOfLastPost);

  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
    console.log(currentPosts);
    setCurrentPage((prevState) => {
      if (currentPosts < 20 && null) {
        setNextPageUrl(null);
      } else {
        return prevState + 1;
      }
    });
  };

  const goToPreviousPage = () => {
    setCurrentPageUrl(prevPageUrl);
    setCurrentPage((prevState) => prevState - 1);
  };

  console.log(currentPosts, genId);

  return (
    <div>
      {loading === true ? (
        <h1>Loading..</h1>
      ) : (
        <div className="main-container">
          <div className="main-left">
            <Generations filterByGeneration={filterByGeneration} />
            <PokemonList
              pokemonsByGen={currentPosts}
              pokemons={pokemons}
              setPokemons={setPokemons}
              pokemonDataUrl={pokemonDataUrl}
              setPokemonDataUrl={setPokemonDataUrl}
              compare={compare}
              setCompare={setCompare}
              genId={genId}
            />

            <Pagination
              goToNextPage={nextPageUrl ? goToNextPage : null}
              goToPreviousPage={prevPageUrl ? goToPreviousPage : null}
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
