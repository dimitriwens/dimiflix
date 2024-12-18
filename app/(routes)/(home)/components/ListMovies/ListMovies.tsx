"use client"

import { useLovedFilms } from "@/hooks/use-loved-films";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";

import { BlockMovies } from "@/components/Shared/BlockMovies";

import { ListMoviesProps } from "./ListMovies.types";

export function ListMovies(props: ListMoviesProps) {
    const { movies } = props;
    const { lovedFilmsByUser } = useLovedFilms();
    const { currentUser } = useCurrentNetflixUser();

    const userNetflix=currentUser?.id;

    const lovedFilms=userNetflix ? lovedFilmsByUser[userNetflix] : [];

    return (
        <div>
        <BlockMovies
            title="My list"
            movies={lovedFilms}
            isMyList={true}
            />
        <BlockMovies 
            title="Recently added movies"
            movies={movies}
            isMyList={false}
        /> 
        </div>
        );
    }