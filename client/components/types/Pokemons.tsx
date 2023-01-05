import React from 'react'
import { MdCatchingPokemon } from 'react-icons/md'
import PokemonItem from './PokemonItem'

type PokemonsProps = {
    pokemons: {
        name: string
        level: number
        trainer: {
            name: string
        }
    }[]
}

function Pokemons(props: PokemonsProps) {
  return (
    <div className = 'flex flex-col mt-5'>
        <div className = 'flex flex-col'>
        <div className = 'flex items-center gap-2 text-lg font-bold'>
            <MdCatchingPokemon className = 'text-2xl rotate-45' />
            <div>Pokemons</div>
        </div>
        <div className = 'mt-1 ml-6 text-gray-400'>{props.pokemons.map((v, i) =>
        <PokemonItem name = {v.name} level = {v.level} trainer = {v.trainer.name} key = {i} />
        )}</div>
        </div>
    </div>
  )
}

export default Pokemons