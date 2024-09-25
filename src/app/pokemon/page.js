"use client";

import pokeStyles from "./pokemon.module.css";
import { useEffect, useState } from "react";

// POKEMON DATA 
/**
    * @typedef (Object) pokemonApiObject This is the object for a pokemon
    * @prop {String} name Name of pokemon
    * @prop {Number} id Id of pokemon
    * @prop {Object} sprites object with all sprite references
    * @prop {String} sprites.front_default default front image for sprite
    * @prop {Number} height height of pokemon, multiply by 10 to make it in cm
    * @prop {Number} wieght weight of pokemon, divide by 10 to make kg
*/

export default function Pokemon() {
    /**
     * @type {[pokemonApiObject, Function]}
     */
    const [pokemon, setPokemon] = useState({ sprites: {} });
    /**
     * @type {[String, Function]}
     */
    const [searchTerm, setSearchTerm] = useState("");

    const [ pokemonEncounters, setPokemonEncounters] = useState([])

    console.log("pokemon encounters: ", pokemonEncounters);

    function changeSearchTerm(e) {
        setSearchTerm(e.currentTarget.value.toLowerCase());
    }

    async function searchForPokemonByName() {
        try{
            const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            const pokeDataFormatted = await rawData.json();
            
            setPokemon(pokeDataFormatted);
        } catch (error) {
            setPokemon({name: searchTerm, sprites: {}})
        }
    }

    useEffect(
        function() {
            if (pokemon.id) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/encounters}`).then((rawData) => {
                return rawData.json();
            }).then((pokeEncounter) => {
                setPokemonEncounters(pokeEncounter);
                //console.log(pokeEncounters);
            })
            .catch((e) => {
                setPokemonEncounters([]);
            });
            }
        },
        [pokemon]
    );

    return(
        <main>
            {/* can only have one top level element */}
            <h1>Pokemon Page</h1>
            <div className={pokeStyles.search}>
                <input 
                    type="search"
                    id="search"
                    name="search"
                    value={searchTerm}
                    onChange={changeSearchTerm}
                />
                <input type="button" value="Search" onClick={searchForPokemonByName}/>
            </div>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default}/>
        </main>
    );
}