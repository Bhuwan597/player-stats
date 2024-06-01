"use client"
import AddMatchRecordForm from '@/components/AddMatchRecord'
import AddPlayerForm from '@/components/AddPlayerForm'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const [option, setOption] = useState<string | null>("player");
  const router = useRouter();
  const searchparams = useSearchParams();

  const handleClick =(nav: string)=>{
    router.push(`/settings?tab=${nav}`)
  }

  useEffect(() => {
    setOption(searchparams.get("tab"))
  }, [searchparams])
  
  return (
    <>
    <div className="flex flex-col items-center justify-start gap-10 min-h-screen">
    <Navbar>
      <NavbarBrand>
        <Link href={"/"} className="font-bold text-inherit">PlayerStats</Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
        <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          <MenuIcon/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem  onClick={()=>handleClick("player")} key="player">Add Player</DropdownItem>
        <DropdownItem onClick={()=>handleClick("record")} key="record">Add Record</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    {option === "player" ? <AddPlayerForm/> : (option === "record") ?  <AddMatchRecordForm/> : "Select the option"}
    </div>
    </>
  )
}

export default Page