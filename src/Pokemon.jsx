import React, { useEffect, useState } from "react";
import "./index.css";
import PokemonCards from "./PokemonCards";
const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    const fetchPokemon = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        // console.log(data);
        const detailedPokemonData = data.results.map(async (curpokemon) => {
          //   console.log(curpokemon.url);
          const res = await fetch(curpokemon.url);
          const data = await res.json();

          return data;
        });

        const detailedResponses = await Promise.all(detailedPokemonData);
        console.log(detailedResponses);

        setPokemon(detailedResponses);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchPokemon();
  }, []);

  //search Function
  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Hello Pokemon again</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Pokemon Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
