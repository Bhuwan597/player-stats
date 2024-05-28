"use client"
import React, { useEffect, useState } from 'react'
import { PlaceholdersAndVanishInput } from './ui/placeholder-and-vanish-input'
import { Boxes } from './ui/background-boxes'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Players } from './Players'

const Hero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const placeholders = [
    "Janak Rawat",
    "Upason Pandey",
    "Hirendra Tiwari",
    "Shrawan Dangi",
    "Dambar Nath",
    "Bijay Raymajhi",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if(!debouncedQuery){
      return router.push('/')
    }
    let queryString = `/?q=${debouncedQuery}`;
    return router.push(queryString)
  }, [debouncedQuery, router])
  
  return (
    <>
    <div className="w-full relative flex flex-col items-center justify-start antialiased overflow-hidden">
    <div className="max-w-2xl mx-auto p-4 my-20">
      <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
       Player <span className='text-blue-500'>Statistics</span> 
      </h1>
      <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        Welcome to MailJet, the best transactional email service on the web.
        We provide reliable, scalable, and customizable email solutions for
        your business. Whether you&apos;re sending order confirmations,
        password reset emails, or promotional campaigns, MailJet has got you
        covered.
      </p>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} />
    </div>
    <Players/>
    <Boxes className='opacity-50'/>
  </div>
    </>
  )
}

export default Hero