"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Players } from "./Players";
import { Input } from "@nextui-org/input";

const Hero = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [debouncedQuery] = useDebounce(query, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!debouncedQuery) {
      return router.push("/");
    }
    let queryString = `/?q=${debouncedQuery}`;
    return router.push(queryString);
  }, [debouncedQuery, router]);

  return (
    <>
      <div className="w-full relative flex flex-col items-center justify-start antialiased overflow-hidden">
        <div className="max-w-2xl mx-auto p-4 my-20">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Player <span className="text-blue-500">Statistics</span>
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Welcome to MailJet, the best transactional email service on the web.
            We provide reliable, scalable, and customizable email solutions for
            your business. Whether you&apos;re sending order confirmations,
            password reset emails, or promotional campaigns, MailJet has got you
            covered.
          </p>
          <Input placeholder="search player. . . . ." value={query} onChange={handleChange} size="lg"/>
        </div>
        <Players />
      </div>
    </>
  );
};

export default Hero;
