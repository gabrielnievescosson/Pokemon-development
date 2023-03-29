import CaptureStructureStyle from "./CaptureStructure.module.css";
import { Component, useContext, useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import PokemonList from "../pokemonList/PokemonList";
import useFetchGet from "../../hooks/useFetchGet";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import SearchLanguage from "../searchLanguage/SearchLanguage";
import { useParams } from "react-router-dom";
import InHeader from "../inHeader/InHeader";
import { BurgerMenuContext } from "../context/burgerMenuContext";

const CaptureStructure = (props) => {
  const { language } = useParams();
  const [pageOffset, setPageOffset] = useState(0);
  const { widthBurgerMenu, widthList, globalUser } = useContext(BurgerMenuContext);

  const { data, isLoadin, hasError } = useFetchGet(
    `http://localhost:8080/pokedex/pokemon?quantity=12&offset=${pageOffset}&language=${language}`);

  return (
    <>
      <InHeader username={globalUser.username}></InHeader>
      <div className={CaptureStructureStyle.complete}>
        <div className={CaptureStructureStyle.burgerMenu} style={widthBurgerMenu}>
          <BurgerMenu language = {language} userName={globalUser.name} userRole={globalUser.role}></BurgerMenu>
        </div>
        <div className={CaptureStructureStyle.pokemonList} style={widthList}>
          <SearchLanguage language= {language}></SearchLanguage>
          <div className={CaptureStructureStyle.listHeader}>
            <div className={CaptureStructureStyle.titleContainer}>
              <h1 className={CaptureStructureStyle.title}>My Pokemons</h1>
            </div>
            <div className={CaptureStructureStyle.paginationContainer}>
              <button
                className={CaptureStructureStyle.button}
                onClick={() => setPageOffset(pageOffset - 12)}
                disabled={pageOffset == 0 ? true : false}
              >
                Previous
              </button>
              <button
                className={CaptureStructureStyle.button}
                onClick={() => setPageOffset(pageOffset + 12)}
                disabled={pageOffset == 636 ? true : false}
              >
                Next
              </button>
            </div>
          </div>
          {isLoadin === true && <Spinner></Spinner>}
          {isLoadin === false && <PokemonList data={data}></PokemonList>}
        </div>
      </div>
    </>
  );
};

export default CaptureStructure;