import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import HorizontalDivider from "./partials/HorizontalDivider";
import { Faculty, Player, PlayerRole } from "@/types/Player";
import { useSearchParams } from "next/navigation";

const groupProjectsByAlphabet = (
  projects: Player[],
  search: string
): Record<string, Player[]> => {
  let sortedProjects = projects.sort((a, b) => a.name.localeCompare(b.name));

  if (search) {
    sortedProjects = sortedProjects.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const groupedProjects: Record<string, Player[]> = {};

  sortedProjects.forEach((project: Player) => {
    const firstLetter = project.name[0].toUpperCase();
    if (!groupedProjects[firstLetter]) {
      groupedProjects[firstLetter] = [];
    }
    groupedProjects[firstLetter].push(project);
  });

  return groupedProjects;
};

export function Players() {
  const params = useSearchParams();
  const searchQuery = params.get("q") || "";

  const [players, setPlayers] = useState<Record<string, Player[]>>({});

  useEffect(() => {
    const groupedProjects = groupProjectsByAlphabet(projects, searchQuery);
    setPlayers(groupedProjects);
  }, [searchQuery]);

  return (
    <div className="mx-auto px-2 min-h-32">
      {Object.keys(players).length === 0 ? (
        <div className="text-center">
          <p className="text-xl dark:text-zinc-100 text-neutral-700 text-pretty">No Player Found</p>
          <p className="text-gray-400">Try adjusting your search query</p>
        </div>
      ) : (
        Object.keys(players).map((letter) => (
          <div key={letter}>
            <HorizontalDivider title={letter} />
            <HoverEffect items={players[letter]} />
          </div>
        ))
      )}
    </div>
  );
}
export const projects: Player[] = [
  {
    profile: "/krantikari.jpg", 
    name: "Stripe",
    faculty: Faculty.BEI,
    slug: "https://stripe.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Netflix",
    faculty: Faculty.BEI,
    slug: "https://netflix.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Google",
    faculty: Faculty.BEI,
    slug: "https://google.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Meta",
    faculty: Faculty.BEI,
    slug: "https://meta.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Amazon",
    faculty: Faculty.BEI,
    slug: "https://amazon.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Microsoft",
    faculty: Faculty.BEI,
    slug: "https://microsoft.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Stripe",
    faculty: Faculty.BEI,
    slug: "https://stripe.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Netflix",
    faculty: Faculty.BEI,
    slug: "https://netflix.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Google",
    faculty: Faculty.BEI,
    slug: "https://google.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Meta",
    faculty: Faculty.BEI,
    slug: "https://meta.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Amazon",
    faculty: Faculty.BEI,
    slug: "https://amazon.com",
    role: PlayerRole.BATSMAN,
  },
  {
    profile: "/krantikari.jpg", 
    name: "Microsoft",
    faculty: Faculty.BEI,
    slug: "https://microsoft.com",
    role: PlayerRole.BATSMAN,
  },
];
