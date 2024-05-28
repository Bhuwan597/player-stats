import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import HorizontalDivider from "./partials/HorizontalDivider";
import { Player } from "@/types/Player";
import { useSearchParams } from "next/navigation";

// Function to sort and group projects by their starting letter
const groupProjectsByAlphabet = (
  projects: Player[],
  search: string
): Record<string, Player[]> => {
  let sortedProjects = projects.sort((a, b) => a.title.localeCompare(b.title));

  if (search) {
    sortedProjects = sortedProjects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const groupedProjects: Record<string, Player[]> = {};

  sortedProjects.forEach((project: Player) => {
    const firstLetter = project.title[0].toUpperCase();
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
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
