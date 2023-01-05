import { MdAdd, MdCatchingPokemon } from "react-icons/md"
import React from "react"

type TitleProps = {
  edit: string
}

function Title(props: TitleProps) {

  return (
    <div className='text-5xl font-bold text-gray-700 mt-10 ml-10 flex items-end'>
        <MdCatchingPokemon className = 'text-8xl rotate-45' />
        <div className = 'ml-2'>Pokemons</div>
    </div>
  )
}

export default Title