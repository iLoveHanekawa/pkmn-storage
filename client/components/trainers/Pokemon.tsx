import React from 'react'
import { DELETE_POKEMON, GET_POKEMONS, GET_TRAINERS, GET_TYPES } from '../../queries/query'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useMutation } from '@apollo/client'

type PokemonPropsType = {
    name: string
    type: string
    level: number
    idForMutate: string | null | undefined
    parentId: string
    id: string
}

function Pokemon(props: PokemonPropsType) {
  const [delMutation] = useMutation(DELETE_POKEMON, { variables: { "id": props.id },
    update(cache, { data }) {
      const { trainers } = cache.readQuery({ query: GET_TRAINERS }) as { trainers: { id: string, pokemons: { id: string }[]}[]}
      cache.writeQuery({
        query: GET_TRAINERS,
        data: {
          trainers: trainers.map(val => val.id === props.parentId? {...val, pokemons: val.pokemons.filter(pkmn => pkmn.id !== data.deletePokemon.id)}: val)
        }
      })
      const { pokemons } = cache.readQuery({
        query: GET_POKEMONS
      }) as { pokemons: { id: string }[] }
  
      cache.writeQuery({
        query: GET_POKEMONS,
        data: {
          pokemons: pokemons.filter(val => val.id !== data.deletePokemon.id)
        }
      })
    }
  })

  return (
    <div className = 'flex flex-col items-start mt-1 ml-6'>
        <div className = 'font-bold italic flex items-center gap-3'>{props.name}
          {props.parentId === props.idForMutate && <MdOutlineDeleteOutline className = 'cursor-pointer' onClick = {async () => {
             
            await delMutation()
          }} />}
        </div>
        <div className = 'ml-6 text-gray-400'>
            Type: {props.type}
        </div>
        <div className = 'ml-6 text-gray-400'>Level: {props.level}</div>
    </div>
  )
}

export default Pokemon