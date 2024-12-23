"use client";

import Link from "next/link";
import GitHubSvg from "../assets/svgs/github-logo.svg";
import MagnificantGlasses from "../assets/svgs/magnificant-glasses.svg";
import ArrowLeftSvg from "../assets/svgs/arrow-left.svg";
import ArrowRigthSvg from "../assets/svgs/arrow-rigth.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { CharactersResponseTypes, Characters } from "./types";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState("");
  const [page, setPage] = useState(1);

  const isProduction = process.env.NODE_ENV === "production";

  const baseURL = isProduction
    ? process?.env?.NEXT_BASE_URL
    : process?.env?.NEXT_PUBLIC_BASE_URL;

  const getRickAndMortyCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/character?page=${page}`);

      const charactersResponse: CharactersResponseTypes = response.data;

      setCharacters(charactersResponse.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setHasError("Ups algo falló");
    }
  };

  const searchCharacters = async (query: string) => {
    const condition = query.trim();

    if (!condition) {
      return;
    }

    setPage(1);

    setLoading(true);
    setHasError("");

    try {
      const response = await axios.get(
        `${baseURL}/character/?name=${query}&page=${page}`
      );

      const charactersResponse: CharactersResponseTypes = response.data;

      setCharacters(charactersResponse.results);
      setLoading(false);
    } catch (error) {
      console.log("Error searching characters:", error);
      setLoading(false);
      setCharacters([]);
      setHasError("No se encontraron personajes con ese nombre.");
    }
  };

  useEffect(() => {
    getRickAndMortyCharacters();
  }, [page]);

  return (
    <div className="bg-white min-h-screen">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            <p className="mt-4 text-xl font-semibold">Cargando...</p>
          </div>
        </div>
      )}

      <div className="flex h-16 items-center justify-between px-4 py-12 md:px-6 bg-[rgb(241,245,249)] bg-opacity-75 rounded-lg shadow-lg border-b-4 border-transparent hover:border-b-gray-300">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-semibold">
            <span className="text-green-400">Rick </span>
            <span className="text-black"> and </span>
            <span className="text-yellow-400">Morty</span>
            <span className="text-black"> App</span>
          </span>
        </Link>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <GitHubSvg className="w-10 h-10 fill-black lg:w-12 lg:h-12" />
          <span className="sr-only">GitHub</span>
        </Link>
      </div>
      <div className="flex items-center h-16 justify-center">
        <div className="relative flex items-center  ">
          <input
            placeholder="Name of character..."
            className="pl-4 pr-10 py-2 w-[384px] border-[3px] border-green-500 focus:border-blue-500  outline-none text-black h-11 placeholder:italic placeholder:font-semibold  p-2 "
            onChange={(e) => {
              searchCharacters(e.target.value);
            }}
          />
          <MagnificantGlasses className="absolute right-3 fill-black w-18 h-18" />
        </div>
      </div>
      <div className="flex justify-between px-[52px] mb-6">
        <ArrowLeftSvg
          className={`${
            page === 1 ? "bg-gray-500" : "bg-blue-500"
          } fill-white h-18 w-36`}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        />
        <ArrowRigthSvg
          className={`${
            characters.length < 20 ? "bg-gray-500" : "bg-blue-500"
          } fill-white h-18 w-36`}
          onClick={() => {
            if (characters.length === 20) {
              setPage(page + 1);
            }
          }}
        />
      </div>
      {hasError && (
        <div className="w-full flex justify-center">
          <span className="text-red-500 text-lg">{hasError}</span>
        </div>
      )}
      <div className="max-w-full p-4 flex flex-col md:flex-row md:flex-wrap space-y-6 md:space-y-0 gap-8 items-center md:justify-center">
        {characters.map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
}
