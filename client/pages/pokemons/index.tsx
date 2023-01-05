import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS, GET_TRAINERS, GET_TYPES } from '../../queries/query'
import SubHeading from '../../components/pokemons/SubHeading'
import { FaFireAlt, FaLevelUpAlt } from 'react-icons/fa'
import Title from '../../components/pokemons/Title'
import Name from '../../components/pokemons/Name'
import Trainer from '../../components/pokemons/Trainer'
import { MdEdit } from 'react-icons/md'

type PokemonType = { 
  name: string, 
  level: number,
  id: string, 
  type: {
    name: string
  }
  trainer: { 
    id: string
    name: string, 
    badges: number
    pokemons: {
      name: string
    }[]
  }
}

function Trainers() {
  const [ edit, setEdit ] = React.useState('')
  const { data: trainerData, loading: trainerLoading, error: trainerError } = useQuery(GET_TRAINERS)
  const { data: typeData, loading: typeLoading, error: typeError } = useQuery(GET_TYPES)
  const { data: pokemonData, loading: pokemonLoading, error: pokemonError } = useQuery(GET_POKEMONS)
  if(pokemonLoading || trainerLoading || typeLoading) return <div>Loading...</div>
  else
  return (
    <div className = 'flex flex-col'>
      <Title edit = {edit} />
      <ul className = 'flex flex-col items-center justify-center'>{(pokemonData.pokemons as PokemonType[]).map((value, index) => {
        return <li className = 'w-11/12 px-10 py-5 text-gray-500 my-6 rounded-md shadow-md ' key = {index}>
          <Name edit = {edit} setEdit = {setEdit} id = {value.id} name = {value.name} />
          <div className = 'flex flex-col mt-5'>
            <SubHeading trainerId={value.trainer.id} edit = {edit} id = {value.id} title={'Type'} value = {value.type.name} icon = {FaFireAlt} />
            <SubHeading trainerId={value.trainer.id} edit = {edit} id = {value.id} title={'Level'} value = {value.level} icon = {FaLevelUpAlt} />
          </div>
          <Trainer name= {value.trainer.name} badges = {value.trainer.badges} pokemons = {value.trainer.pokemons} />
        </li>
      })}</ul>
    </div>
  )
}

export default Trainers