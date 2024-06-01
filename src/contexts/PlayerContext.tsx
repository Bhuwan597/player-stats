"use client"
import React, { createContext, useReducer, ReactNode, Dispatch, useContext, useEffect } from "react";
import { Player } from "@/types/Player";

// Define the state and action types
interface PlayersState {
  players: Record<string,Player[]>;
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: {},
  loading: true,
  error: null,
};

type Action =
  | { type: 'SET_PLAYERS'; payload: Record<string,Player[]> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const playersReducer = (state: PlayersState, action: Action): PlayersState => {
  switch (action.type) {
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface PlayersContextProps {
  state: PlayersState;
  dispatch: Dispatch<Action>;
}
export const groupProjectsByAlphabet = (
  search: string,
  projects: Player[],
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

const PlayersContext = createContext<PlayersContextProps | undefined>(undefined);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playersReducer, initialState);

  const fetchPlayers = async () => {
    try {
      dispatch({type: "SET_LOADING", payload: true})
      const res = await fetch("/api/players");
      if (!res.ok) {
        throw new Error("Failed to fetch player data");
      }
      const data = await res.json();
      const playersList = groupProjectsByAlphabet("", data.players);
      dispatch({type: "SET_PLAYERS", payload: playersList})
    } catch (error) {
      console.error(error);
      dispatch({type: "SET_ERROR", payload: "Failed to fetch player data. Please try again." })
    } finally {
      dispatch({type: "SET_LOADING", payload: false})
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [])
  

  return (
    <PlayersContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = (): PlayersContextProps => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};
