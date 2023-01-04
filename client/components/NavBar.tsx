import Link from "next/link"
import { MdCatchingPokemon } from 'react-icons/md'
import { GiHoodie, GiSmallFire } from 'react-icons/gi'
import { FaHome } from 'react-icons/fa'
import { useRouter } from "next/router"
import React from "react"

function NavBar() {

    const router = useRouter()
    const path = router.pathname
  return (
    <div className = 'w-screen shadow-md flex justify-start items-center pl-8 py-8 gap-8 bg-amber-300'>
        <Link href={'/'}><FaHome className = {`navItem ${'/' === path? 'text-white': 'text-black'}`} /></Link>
        <Link href={'/trainers'}><GiHoodie className = {`navItem ${'/trainers' === path? 'text-white': 'text-black'}`} /></Link>
        <Link href={'/pokemons'}><MdCatchingPokemon className = {`navItem ${'/pokemons' === path? 'text-white': 'text-black'}`} /></Link>
        <Link href={'/types'}><GiSmallFire className = {`navItem ${'/types' === path? 'text-white': 'text-black'}`} /></Link>

    </div>
  )
}

export default NavBar