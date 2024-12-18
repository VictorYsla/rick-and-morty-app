import React from "react";
import Image from "next/image";
import { Gender, Species, Status, Location } from "../app/types";

interface CharacterCardProps {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  status,
  species,
  gender,
  location,
  image,
}) => {
  const statusColor =
    status.toLowerCase() === "alive"
      ? "text-blue-600"
      : status.toLowerCase() === "dead"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <div className="w-[230px] h-[420px] border-[3px] border-blue-500 rounded-t-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={image}
        alt={name}
        width={500}
        height={220}
        className="object-cover"
        priority
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-green-600 ">{name}</h2>
        <p className={`text-lg font-bold ${statusColor}`}>Status: {status}</p>
        <p className="text-sm text-gray-700">
          <span className="font-bold">Location:</span> {location.name}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-bold">Species:</span> {species}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-bold">Gender:</span> {gender}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
