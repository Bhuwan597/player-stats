import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import HorizontalDivider from "./partials/HorizontalDivider";
import { Player } from "@/types/Player";
import { useSearchParams } from "next/navigation";
import Loader from "./partials/Loader";
import { groupProjectsByAlphabet, usePlayers } from "@/contexts/PlayerContext";

export function Players() {
  const params = useSearchParams();
  const searchQuery = params.get("q") || "";
  const {state, dispatch} = usePlayers();


  const [duplicatePlayers, setDuplicatePlayers] = useState<Record<string, Player[]>>(state.players);

  useEffect(() => {
    const filteredPlayers = groupProjectsByAlphabet(searchQuery, Object.values(state.players).flat());
    setDuplicatePlayers(filteredPlayers);
  }, [searchQuery, state.players]);

  if (state.loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto px-2 min-h-32">
      {state.error ? (
        <div className="text-center">
          <p className="text-xl dark:text-zinc-100 text-neutral-700 text-pretty">
            {state.error}
          </p>
        </div>
      ) :  Object.keys(duplicatePlayers).length === 0 ? (
        <div className="text-center">
          <p className="text-xl dark:text-zinc-100 text-neutral-700 text-pretty">
            No Player Found
          </p>
          <p className="text-gray-400">Try adjusting your search query</p>
        </div>
      ) : (
        Object.keys(duplicatePlayers).map((letter) => (
          <div key={letter}>
            <HorizontalDivider title={letter} />
            <HoverEffect items={duplicatePlayers[letter]} />
          </div>
        ))
      )}
    </div>
  );
}
