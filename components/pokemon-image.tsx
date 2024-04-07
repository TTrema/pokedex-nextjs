"use client"
import Image from "next/image";

export function PokemonImage({ image, name } : { image: string, name: string }) {
  return (
    <Image
      src={image}
      alt={"Picture of " + name}
      unoptimized
      priority
      fill
      sizes="(max-width: 768px) 50vw, 100vw"
      style={{ objectFit: "contain" }}
      className="transition-opacity opacity-0 duration[&lsqb;2s&rsqb;]"
      onLoad={(image) => (image.target as HTMLImageElement).classList.remove("opacity-0")}

    />
  );
}
