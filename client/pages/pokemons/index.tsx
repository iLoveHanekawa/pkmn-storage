import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS } from '../../queries/query'
import SubHeading from '../../components/pokemons/SubHeading'
import { FaFireAlt, FaLevelUpAlt } from 'react-icons/fa'
import Title from '../../components/pokemons/Title'
import Name from '../../components/pokemons/Name'
import Trainer from '../../components/pokemons/Trainer'

type PokemonType = { 
  name: string, 
  level: number,
  id: string, 
  type: {
    name: string
  }
  trainer: { 
    name: string, 
    badges: number
    pokemons: {
      name: string
    }[]
  }
}

function Trainers() {

  const { data, loading, error } = useQuery(GET_POKEMONS)
  if(loading) return <div>Loading...</div>
  else
  return (
    <div className = 'flex flex-col'>
      <Title />
      <ul className = 'flex flex-col items-center justify-center'>{(data.pokemons as PokemonType[]).map((value, index) => {
        return <li className = 'w-11/12 px-10 py-5 text-gray-500 my-6 rounded-md shadow-md ' key = {index}>
          <Name name = {value.name} />
          <div className = 'flex flex-col mt-5'>
            <SubHeading title={'Type'} value = {value.type.name} icon = {FaFireAlt} />
            <SubHeading title={'Level'} value = {value.level} icon = {FaLevelUpAlt} />
          </div>
          <Trainer name= {value.trainer.name} badges = {value.trainer.badges} pokemons = {value.trainer.pokemons} />
        </li>
      })}</ul>
    </div>
  )
}

export default Trainers