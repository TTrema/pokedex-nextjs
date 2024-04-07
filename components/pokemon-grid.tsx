"use client"
import { useState } from "react"; 
import { Label } from "./ui/label"; 
import { Input } from "./ui/input"; 
import { PokemonCard } from "./pokemon-card"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


interface PokemonGridProps {
    pokemonList: any[]; 
}


export function PokemonGrid({ pokemonList }: PokemonGridProps) {
    // State for managing search text
    const [searchText, setSearchText] = useState("");
    // State for managing the count of visible Pokemon
    const [visiblePokemonCount, setVisiblePokemonCount] = useState(50); // Initial count of visible Pokemon

    // Filter the Pokemon list based on search text
    const filteredPokemonList = pokemonList.filter(
        (pokemon: any) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Load more Pokemon when "Load More" button is clicked
    const loadMorePokemon = () => {
        setVisiblePokemonCount(prevCount => prevCount + 100);
    };

    return (
        <>
            {/* Search input section */}
            <div className="grid w-full pt-4 max-w-sm gap-1.5 mt-6 relative" style={{ width: "clamp(40px, 80vw, 500px)" }}>
                <div className="flex">
                    <div className="mt-3 mr-1 ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </div>
                    <Input
                        type="text"
                        value={searchText}
                        id="pokemonName2"
                        placeholder="Pokemon search"
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full bg-gray-700 ml-1" 
                    />
                </div>
            </div>

            {/* Pokemon grid */}
            <div className="mb-8 mt-8 ml-2 mr-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {/* Mapping through filtered Pokemon list and rendering PokemonCard component */}
                {filteredPokemonList.slice(0, visiblePokemonCount).map((pokemon: any) => (
                    <PokemonCard key={pokemon.name + "Card"} name={pokemon.name} url={pokemon.url} />
                ))}
            </div>

            {/* Render "Load More" button if there are more Pokemon to load */}
            {visiblePokemonCount < filteredPokemonList.length && (
                <div className="flex justify-center mb-10">
                    <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold text-3xl py-4 px-8 rounded" onClick={loadMorePokemon}>
                        Load More
                    </button>
                </div>
            )}
        </>
    );
}
