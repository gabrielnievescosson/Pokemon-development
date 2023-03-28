import HomeStructureStyle from './HomeStructure.module.css';
import { Component, useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import PokemonList from "../../components/pokemonList/PokemonList";
import useFetchGet from "../../hooks/useFetchGet";
import BurgerMenu from '../burgerMenu/BurgerMenu';
import SearchLanguage from '../searchLanguage/SearchLanguage';

const HomeStructure = (props) => {
    const { getFetch } = useFetchGet();
    const [pokemons, setPokemons] = useState("");
    const [url, setUrl] = useState({quantity: 0, resultes: []});
    
    const { data, isLoadin, hasError } = useFetchGet("http://localhost:8080/pokedex/pokemon?quantity=12&offset=0");
    let burgerWidth = 50;
    let listWidth = 100; 

    return(
        <>
        
        <div className={HomeStructureStyle.complete}>
            <div className={HomeStructureStyle.burgerMenu} style={{width: "0%"}}>
                <BurgerMenu></BurgerMenu>
            </div>
            <div className={HomeStructureStyle.pokemonList} style={{width: "100%"}}>
                <SearchLanguage></SearchLanguage>
                {isLoadin === true && <Spinner></Spinner>}
                {isLoadin === false && <PokemonList data={data}></PokemonList>}
            </div>
        </div>
      </>
    );
};

export default HomeStructure;