import { MatchRecord } from "@/types/Player";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getPlayer(slug: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/players/${slug}`);
    const data = await res.json();
    if (!res.ok) {
      throw Error();
    }
    return data;
  } catch (error: any) {
    return null;
  }
}
export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const player = await getPlayer(slug);
  if (!player) return notFound();
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md py-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Player Profile
        <Divider className="my-2"/>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center divide-y md:divide-x divide-gray-600">
          <div className="flex flex-col items-center md:flex-row md:items-start ">
            <div className="flex-shrink-0 w-full flex flex-col items-start justify-center">
            <div className="flex-grow mt-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Name:
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-xl">
                  {player?.name}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Faculty:
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {player?.faculty}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Role:
                </h2>
                <p className="bg-blue-500 text-white rounded-full px-3 py-1 mr-2 text-xs font-bold uppercase w-fit">
                  {player?.role}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Runs:
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {player?.runs}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Strike Rate:
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {player?.strikeRate}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Wickets:
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {player?.wickets}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Batting Average:
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {player?.battingAverage}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Economy:
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {player?.economy}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Bowling Average:
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {player?.bowlingAverage}
                </p>
              </div>
            </div>
            </div>
          </div>
          <div className="px-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Match Records:
            </h2>
            <Divider className="my-2"/>
            <div className="space-y-4">
              {player?.records?.length === 0 && (
                <p className="text-lg italic text-red-400">
                  No Records Till Now!
                </p>
              )}
              {player?.records?.map((record: MatchRecord) => {
                return (
                  <Link
                    href={`/records/${(record as any).slug}`}
                    key={record.matchName}
                    className="flex flex-col gap-4"
                  >
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                      {record.matchName}
                    </h3>
                    <p className="mb-1 text-gray-700 dark:text-gray-300">
                      Match Date: {record.matchDate}
                    </p>
                    {/* Batting details */}
                    {record &&
                      record.batting &&
                      Object.values(record?.batting).some(
                        (value) => value !== null
                      ) && (
                        <div className="flex justify-between items-center mb-1 text-gray-700 dark:text-gray-300">
                          <p>Batting:</p>
                          <p>
                            {record?.batting?.balls} balls,{" "}
                            {record?.batting?.runs} runs{" "}
                            {record?.batting?.status === "not_out" && (
                              <span className="text-green-500">*</span>
                            )}
                          </p>
                        </div>
                      )}

                    {/* Bowling details */}
                    {record &&
                      record.bowling &&
                      Object.values(record?.bowling).some(
                        (value) => value !== null
                      ) && (
                        <div className="flex flex-col text-gray-700 dark:text-gray-300">
                          <p className="mb-1">Bowling:</p>
                          <div className="flex justify-between items-center">
                            <p>{record?.bowling?.overs} overs,</p>
                            <p>{record?.bowling?.runs} runs,</p>
                            <p>{record?.bowling?.wickets} wickets</p>
                          </div>
                        </div>
                      )}
                      </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
