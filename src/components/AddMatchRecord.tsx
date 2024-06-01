"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import NepaliDatePicker from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import InfoIcon from "@mui/icons-material/Info";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import RSelect from "react-select";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import {
  IconCalendar,
  IconCheck,
  IconTrophy,
  IconTypeface,
} from "@tabler/icons-react";
import { usePlayers } from "@/contexts/PlayerContext";
import { darkModeStyles, lightModeStyles } from "./partials/ReactSelectOptions";
import { BattingRecord, BowlingRecord, MatchRecord } from "@/types/Player";
import { toast } from "react-toastify";

const AddMatchRecordForm = () => {
  const { state } = usePlayers();
  const [formData, setFormData] = useState<MatchRecord>({
    matchName: "",
    matchDate: "",
    player: "",
    batting: {
      balls: null,
      runs: null,
      status: "",
    },
    bowling: {
      overs: null,
      runs: null,
      wickets: null,
    },

  });

  const [playerOptions, setPlayerOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [batting, setBatting] = useState<BattingRecord>({
    balls: null,
    runs: null,
    status: "",
  });
  const [bowling, setBowling] = useState<BowlingRecord>({
    overs: null,
    runs: null,
    wickets: null,
  });
  const [action, setAction] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const customStyles = isDarkMode ? darkModeStyles : lightModeStyles;

  useEffect(() => {
    if (state.players) {
      const options = Object.values(state.players)
        .flat()
        .map((p) => {
          return { label: p.name, value: p._id };
        });
      setPlayerOptions(options);
    }
  }, [state.players]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.matchDate || !formData.matchName || !formData.player) {
      return toast.warning("All input fields are required!");
    }
    const bodyJson = {
      ...formData,
        batting: batting,
        bowling: bowling,
      }
    try {
      setLoading(true);
      const res = await fetch("/api/records", {
        method: "POST",
        body: JSON.stringify(bodyJson),
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message);
      }
      toast.success(data.message);
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBowling({
      overs: null,
      runs: null,
      wickets: null,
    });
    setBatting({
      balls: null,
      runs: null,
      status: null,
    });
  }, [action]);

  const handlePlayerChange = (value: string) => {
    setFormData({ ...formData, player: value });
  };

  const BattingFields = () => {
    return (
      <>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="balls played">Balls Played:</label>
          <Input
            startContent={<SportsBaseballIcon />}
            min={"0"}
            required
            type="number"
            placeholder="type balls played by player"
            className="shadow-sm"
            variant="bordered"
            value={`${batting.balls}`}
            onChange={(e) =>
              setBatting({ ...batting, balls: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="runs scored">Runs Scored:</label>
          <Input
            startContent={<SportsCricketIcon />}
            min={"0"}
            required
            type="number"
            placeholder="type runs scored by player"
            className="shadow-sm"
            variant="bordered"
            value={`${batting.runs}`}
            onChange={(e) =>
              setBatting({ ...batting, runs: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="runs scored">Wicket Status:</label>
          <Select
            startContent={<IconCheck />}
            variant="bordered"
            placeholder="select wicket status"
            isRequired
            onChange={(e) => setBatting({ ...batting, status: e.target.value })}
          >
            <SelectItem key={"out"} value={"out"}>
              Out
            </SelectItem>
            <SelectItem key={"not_out"} value={"not_out"}>
              Not Out
            </SelectItem>
          </Select>
        </div>
      </>
    );
  };

  const BowlingFields = () => {
    return (
      <>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="overs bowled">Overs Bowled:</label>
          <Input
            startContent={<SportsBaseballIcon />}
            min={"0"}
            required
            type="number"
            placeholder="type overs bowled by player"
            className="shadow-sm"
            variant="bordered"
            value={`${bowling.overs}`}
            onChange={(e) =>
              setBowling({ ...bowling, overs: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="runs conceded">Runs conceded:</label>
          <Input
            startContent={<SportsCricketIcon />}
            min={"0"}
            required
            type="number"
            placeholder="type runs conceded by player"
            className="shadow-sm"
            variant="bordered"
            value={`${bowling.runs}`}
            onChange={(e) =>
              setBowling({ ...bowling, runs: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="wickets taken">Wickets Taken:</label>
          <Input
            startContent={<IconTrophy />}
            min={"0"}
            required
            type="number"
            placeholder="type wickets taken by player"
            className="shadow-sm"
            variant="bordered"
            value={`${bowling.wickets}`}
            onChange={(e) =>
              setBowling({ ...bowling, wickets: Number(e.target.value) })
            }
          />
        </div>
      </>
    );
  };
  return (
    <div className="p-6 rounded-lg mb-20 shadow-lg w-full max-w-md  dark:bg-black dark:text-white bg-white text-black border-2">
      <h2 className="text-center mb-2 text-xl font-bold">Add match record</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="player">Player's Name:</label>
          <RSelect
            isSearchable
            required
            isLoading={state.loading}
            options={playerOptions}
            styles={customStyles}
            onChange={(e) => handlePlayerChange(e?.value || "")}
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="match name">Match Name:</label>
          <Input
            startContent={<IconTypeface />}
            required
            placeholder="type match name"
            className="shadow-sm"
            variant="bordered"
            value={formData.matchName}
            onChange={(e) =>
              setFormData({ ...formData, matchName: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="match date" className="flex flex-nowrap gap-2">
            <IconCalendar /> Match Date:
          </label>
          <NepaliDatePicker
            inputClassName="form-control"
            className="p-2 rounded-md"
            onChange={(value: { bsDate: string; adDate: string }) =>
              setFormData({ ...formData, matchDate: value.bsDate })
            }
            options={{ calenderLocale: "ne", valueLocale: "en" }}
            theme="dark"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="balls played">Action:</label>
          <Select
            startContent={<InfoIcon />}
            onChange={(e) => setAction(e.target.value)}
            placeholder="what this player did?"
            isRequired
            variant="bordered"
          >
            <SelectItem key={"batting"} value={"batting"}>
              Batting
            </SelectItem>
            <SelectItem key={"bowling"} value={"bowling"}>
              Bowling
            </SelectItem>
            <SelectItem key={"both"} value={"both"}>
              Both
            </SelectItem>
          </Select>
        </div>
        {action === "batting" && BattingFields()}
        {action === "bowling" && BowlingFields()}
        {action === "both" && (
          <>
            {BattingFields()}
            {BowlingFields()}
          </>
        )}
        <Button isLoading={loading} type="submit" color="primary">
          Add Record
        </Button>
      </form>
    </div>
  );
};

export default AddMatchRecordForm;
