import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { auth } from "@/auth";

import { Navbar } from "@/components/Shared/Navbar/Navbar";

import { SliderVideo } from "./(routes)/(home)/components/SliderVideo/SliderVideo";
import { TrendingMovies } from "./(routes)/(home)/components/TrendingMovies";
import { ListMovies } from "./(routes)/(home)/components/ListMovies";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const usersNetflix = await db.userNetflix.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const movies = await db.normalMovies.findMany();
  const trendingMovies = await db.trendingMovies.findMany({
    orderBy: { ranking: "asc" },
  });

  return (
    <section className="relative bg-zinc-900">
      <Navbar users={usersNetflix} />
      <SliderVideo />
      <TrendingMovies movies={trendingMovies} />
      <ListMovies movies={movies} />
    </section>
  );
}
