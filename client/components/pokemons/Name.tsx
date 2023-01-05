import React from 'react'
import { MdAdd, MdEdit, MdOutlineDeleteOutline } from 'react-icons/md'
import { useMutation } from '@apollo/client'
import { DELETE_POKEMON, GET_POKEMONS, GET_TRAINERS, GET_TYPES } from '../../queries/query'

type NameProps = {
    name: string
    edit: string
    id: string
    setEdit: React.Dispatch<React.SetStateAction<string>>
}

function Name(props: NameProps) {

  const [mutation] = useMutation(DELETE_POKEMON, {variables: {"id": props.id},
  update(cache, { data }){
    const { trainers } = cache.readQuery({
      query: GET_TRAINERS
    }) as { trainers: { id: string, pokemons: { id: string, trainer: { id: string } }[ ] }[] }
    cache.writeQuery({
      query: GET_TRAINERS,
      data: {
        trainers: trainers.map(val => val.id !== data.deletePokemon.trainer.id? val: {...val, pokemons: val.pokemons.filter(pkmn => pkmn.id !== data.deletePokemon.id)})
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
    const { types } = cache.readQuery({
      query: GET_TYPES
    }) as { types: { id: string, pokemons: { id: string }[]}[] }

    cache.writeQuery({
      query: GET_TYPES,
      data: {
        types: types.map(val => val.id !== data.deletePokemon.type.id? val: {...val, pokemons: val.pokemons.filter(pkmn => pkmn.id !== data.deletePokemon.id )})
      }
    })

  }})

  return (
    <div className = 'flex items-end text-gray-600'>
        <div className = 'text-3xl font-bold italic w-full tracking-wide flex items-center gap-3'>
            {props.name}{props.edit === props.id? <MdAdd onClick = {() => {props.setEdit('')}} className = 'rotate-45 text-4xl cursor-pointer' />: <MdEdit className = 'cursor-pointer' onClick = {() => {props.setEdit(props.id)}} />}
            {props.edit === props.id && <MdOutlineDeleteOutline className = 'cursor-pointer' onClick = {async() => {await mutation()}} />}
            <hr />
        </div>
    </div>
  )
}

export default Name