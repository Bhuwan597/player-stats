"use client";
import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  Face,
  School,
  Sports,
  SportsCricket,
  SportsBaseball,
  AddPhotoAlternate,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { Player } from "@/types/Player";
const AddPlayerForm = () => {
  const faculties = [
    { value: "bce", label: "BCE" },
    { value: "bge", label: "BGE" },
    { value: "bme", label: "BME" },
    { value: "bam", label: "BAM" },
    { value: "bei", label: "BEI" },
    { value: "bect", label: "BECT" },
    { value: "bel", label: "BEL" },
  ];

  const roles = [
    { value: "batsman", label: "Batsman" },
    { value: "bowler", label: "Bowler" },
    { value: "all_rounder", label: "All-Rounder" },
  ];
  const [formData, setFormData] = useState<{name: string, faculty:string, role:string}>({
    name: "",
    faculty: "",
    role: "",
  });

  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("/api/settings/players", {
        method: "POST",
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if(!res.ok){
        throw Error(data.message)
      }
      setFormData({
        name: "",
        faculty: "",
        role: "",
      })
      toast.success(data.message)
    } catch (error: any) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="p-6 mb-20 rounded-lg shadow-lg w-full max-w-md  dark:bg-black dark:text-white bg-white text-black border-2">
      <h2 className="text-center mb-2 text-xl font-bold">Add cricket player</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mb-4">
        </div>
        <div className="mb-4">
          <label htmlFor="faculty">Name:</label>
          <Input
            startContent={<Face />}
            required
            placeholder="type player's name"
            className="shadow-sm"
            variant="bordered"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="faculty">Faculty:</label>
          <Select
            startContent={<School />}
            required
            name="role"
            placeholder="select player's role"
            variant="bordered"
            onChange={(e) =>
              setFormData({ ...formData, faculty: e.target.value })
            }
          >
            {faculties.map((faculty) => (
              <SelectItem key={faculty.value} value={faculty.value}>
                {faculty.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <label htmlFor="role">Role:</label>
          <Select
            startContent={<Sports />}
            required
            name="role"
            placeholder="select player's role"
            variant="bordered"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <SelectItem
              key={"batsman"}
              value={"batsman"}
              startContent={<SportsCricket />}
            >
              Batsman
            </SelectItem>
            <SelectItem
              key={"bowler"}
              value={"bowler"}
              startContent={<SportsBaseball />}
            >
              Bowler
            </SelectItem>
            <SelectItem
              key={"all_rounder"}
              value={"all_rounder"}
              startContent={
                <div className="flex flex-nowrap items-center justify-center">
                  <SportsCricket />
                  <div className="mx-2 w-px h-6 bg-blue-600"></div>
                  <SportsBaseball />
                </div>
              }
            >
              All Rounder
            </SelectItem>
          </Select>
        </div>
        <Button isLoading={loading} type="submit" color="primary">
          Add Player
        </Button>
      </form>
    </div>
  );
};

export default AddPlayerForm;
