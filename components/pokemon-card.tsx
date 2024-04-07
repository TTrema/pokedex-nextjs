import Link from "next/link"; 
import { PokemonImage } from "@/components/pokemon-image"; 
import styles from "@/styles/pokemon-card.module.css"; 

interface PokemonCardProps {
  name: string; 
  url: string; 
}

// PokemonCard functional component
export function PokemonCard({ name, url }: PokemonCardProps) {
  // Extracting ID from URL
  const id = url.split("/").slice(-2, -1)[0];

  return (
    <Link
      href={name} 
      className={`${styles.cardLink} ${styles.dark} group rounded-lg transition-colors`} 
      key={name + "Card"} 
    >
      {/* Container for the Pokemon image */}
      <div className={styles.cardContainer}>
        <PokemonImage
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} // Image URL
          name={name} 
        />
      </div>
      
      {/* Container for Pokemon ID and name */}
      <div className="flex flex-col items-center">
        <h2 className={styles.cardId}>{`#${id.toString().padStart(4, "0")}`}</h2>
        <h2 className={`${styles.cardName} ${name === 'crabominable' ? styles.smallText : ''}`}>
          {name.split('-')[0].charAt(0).toUpperCase() + name.split('-')[0].slice(1)}
        </h2>
      </div>
    </Link>
  );
}
