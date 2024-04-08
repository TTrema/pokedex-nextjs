import Link from "next/link";
import { PokemonImage } from "@/components/pokemon-image";
import { Progress } from "@/components/ui/progress";
import { getPokemon } from "@/lib/pokemonAPI";
import styles from "@/styles/pokemonname.module.css"; // Import CSS module
import { typeColors, statNames } from "@/lib/constants"; // Import constants

// Define interfaces for type and ability objects
interface TypeObject {
    type: {
        name: string;
    };
}

interface AbilityObject {
    ability: {
        name: string;
    };
}

export default async function PokemonPage({ params }: { params: { pokemonName: string } }) {
    // Destructure the parameter object to get the pokemonName
    const { pokemonName } = params;

    // Fetch Pokemon data from API
    const pokemonObject = await getPokemon(pokemonName);

    // Convert weight from hectograms to kilograms and pounds
    const weightInKg = pokemonObject.weight / 10;
    const weightInLbs = (weightInKg * 2.20462).toFixed(1);

    // Convert height from decimeters to meters and feet
    const heightInMeters = pokemonObject.height / 10;
    const heightInFeet = heightInMeters * 3.28084;
    const formattedHeightMeters = heightInMeters.toFixed(1);
    const formattedHeightFeet = heightInFeet.toFixed(1);

    // Function to render ability rows
    const renderAbilityRow = (abilities: AbilityObject[], start: number) => (
        <div className="flex flex-wrap">
            {abilities.slice(start, Math.ceil(abilities.length / 2)).map((abilityObject: AbilityObject, index: number) => (
                <span key={index} className="mr-2">
                    {abilityObject.ability.name.charAt(0).toUpperCase() + abilityObject.ability.name.slice(1)}
                </span>
            ))}
        </div>
    );


    return (
        <div className={`mb-5 grid lg:grid-cols-2 mt-6 ${styles.tableContainer}`}>
            {/* Container for the Pokemon image */}
            <div className="flex justify-center items-center ml-4" 
                style={{ position: "relative", maxWidth: "100%", height: "250px", display: 'flex', justifyContent: 'center' }}>
                <PokemonImage
                    image={pokemonObject.sprites.other['official-artwork'].front_default}
                    name={pokemonName}
                />
            </div>

            {/* Container for main details */}
            <div className="">
                <h1>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>N°</th>
                            <td>{pokemonObject.id.toString().padStart(4, '0')}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>
                                {/* Mapping over types */}
                                {pokemonObject.types.map((typeObj: TypeObject, index: number) => (
                                    <span key={index}>
                                        {/* Button for each type */}
                                        <button
                                            style={{
                                                backgroundColor: typeColors[typeObj.type.name] || 'gray',
                                                color: 'white',
                                                borderRadius: '2px',
                                                fontSize: '14px',
                                                margin: '0 2px',
                                                minWidth: '90px',
                                                minHeight: '22px',
                                                fontWeight: 'bold',
                                                fontFamily: 'Arial, sans-serif'
                                            }}
                                            disabled
                                        >
                                            {typeObj.type.name.toUpperCase()}
                                        </button>
                                    </span>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>
                                <span>
                                    {formattedHeightMeters} m ({formattedHeightFeet} ft)
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>
                                <span>
                                    {`${weightInKg.toFixed(1)} kg (${weightInLbs} lbs)`}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>Abilities</th>
                            <td>
                                {/* Container for abilities */}
                                <div className="flex">
                                    {[...Array(2)].map((_, rowIndex) => (
                                        <ul key={rowIndex} className="mr-3">
                                            {pokemonObject.abilities.slice(rowIndex * 2, (rowIndex + 1) * 2).map((ability: any, index: number) => (
                                                <li key={index}>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</li>
                                            ))}
                                        </ul>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Container for base stats */}
            <div className="mt-4">
                <h2 className="text-xl font-bold">Base stats</h2>
                <table className={styles.table}>
                    <tbody>
                        {pokemonObject.stats.map((statObject: any) => {
                            const statName = statObject.stat.name;
                            const statValue = statObject.base_stat;
                            return (
                                <tr key={statName}>
                                    <td className={styles.statName}>{statNames[statName] || statName}</td>
                                    <td className={styles.statValue}>{statValue}</td>
                                    <td className={styles.progress}>
                                        <Progress value={statValue} style={{ height: '8px' }} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Container for moves */}
            <div>
                <h2 className="text-xl font-bold mt-4">Moves</h2>
                <table className={styles.table}>
                <tbody>
                    {[0, 2, 4, 6, 8, 10].map((startIndex, rowIndex) => {
                        // Check if both moves exist
                        const move1Exists = pokemonObject.moves[startIndex];
                        const move2Exists = pokemonObject.moves[startIndex + 1];

                        // Render the table row only if at least one move exists
                        if (move1Exists || move2Exists) {
                        return (
                            <tr key={rowIndex}>
                            {[startIndex, startIndex + 1].map((moveIndex) => {
                                const moveExists = pokemonObject.moves[moveIndex];
                                return (
                                <td key={moveIndex}>
                                    {moveExists && moveExists.move.name.charAt(0).toUpperCase() + moveExists.move.name.slice(1)}
                                </td>
                                );
                            })}
                            </tr>
                        );
                        } else {
                        return null; // If no moves exist, render nothing
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}