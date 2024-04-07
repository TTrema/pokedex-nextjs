import { PokemonGrid } from "@/components/pokemon-grid"; 
import { PokemonCard } from "@/components/pokemon-card"; 
import Image from "next/image"; 
import { getPokemonList } from "@/lib/pokemonAPI"; 

export default async function Home() {
  // Fetching the list of Pokémon asynchronously
  const pokemonList = await getPokemonList();

  return (
    // Rendering the PokemonGrid component with the fetched list of Pokémon
    <PokemonGrid pokemonList={pokemonList}/>
  );
}
