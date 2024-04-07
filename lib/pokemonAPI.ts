const POKEMON_API = "https://pokeapi.co/api/v2/";

// Function to fetch a list of Pokemon
export async function getPokemonList() {
    const response = await fetch(POKEMON_API + "pokemon?limit=1025&offset=0");
    const data = await response.json();
    return data.results;
}

// Function to fetch data for a specific Pokemon by name
export async function getPokemon(name: string) {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();
    return data;
}
