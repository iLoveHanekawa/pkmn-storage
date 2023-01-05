import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_TYPES, GET_POKEMONS, GET_TRAINERS } from '../../queries/query'
import { MdCatchingPokemon } from 'react-icons/md'
import Title from '../../components/types/Title'
import Pokemons from '../../components/types/Pokemons'

type TypeType = { 
  name: string, 
  id: string,
  pokemons: {
    level: number,
    name: string,
    trainer: {
      name: string
    }
  }[]
}

function Trainers() {

  const { data: trainerData, loading: trainerLoading, error: trainerError } = useQuery(GET_TRAINERS)
  const { data: typeData, loading: typeLoading, error: typeError } = useQuery(GET_TYPES)
  const { data: pokemonData, loading: pokemonLoading, error: pokemonError } = useQuery(GET_POKEMONS)
  if(pokemonLoading || trainerLoading || typeLoading) return <div>Loading...</div>
  else
  return (
    
    <div className = 'flex flex-col'>
      <Title />
      <ul className = 'flex flex-col items-center justify-center'>{(typeData.types as TypeType[]).map((value, index) => {
        return <li className = 'w-11/12 px-10 py-5 text-gray-500 my-6 rounded-md shadow-md ' key = {index}>
          <div className = 'flex items-end text-gray-600'>
            <div className = 'text-3xl font-bold italic w-full tracking-wide'>
              {value.name}
              <hr />
            </div>
          </div>
          <Pokemons pokemons={value.pokemons} />
        </li>
      })}</ul>
    </div>
  )
}

export default Trainers