import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_TRAINERS, DELETE_TRAINER, ADD_BADGE, GET_TRAINER, ADD_POKEMON, GET_TYPES, GET_POKEMONS } from '../../queries/query'
import { MdAdd, MdCatchingPokemon, MdOutlineDeleteOutline } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import { SlBadge } from 'react-icons/sl'
import Title from '../../components/trainers/Title'
import SubHeading from '../../components/trainers/SubHeading'
import Pokemon from '../../components/trainers/Pokemon'
import { FiMinus } from 'react-icons/fi'

type TrainerType = { 
  id: string
  name: string, 
  badges: number, 
  pokemons: { 
    id: string
    name: string, 
    level: number, 
    type: { 
      name: string 
    }}[] 
}

function Trainers() {

  const { data, loading, error } = useQuery(GET_TRAINERS)
  const { data: typeData, loading: typeLoading, error: typeError } = useQuery(GET_TYPES)
  const { data: pokemonData, loading: pokemonLoading, error: pokemonError } = useQuery(GET_POKEMONS)
  const [ idForMutate, setIdForMutate ] = React.useState<null | string>()
  const [ newPoke, setNewPoke ] = React.useState<{name: string, level: string, type: string, typeId: string | null | undefined}>({ name: '', level: '', type: 'Select Type', typeId: null })
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPoke({...newPoke, name: e.currentTarget.value})
  }
  const levelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPoke({...newPoke, level: e.currentTarget.value})
  }
  const [mutateBadgeAdd] = useMutation(ADD_BADGE, { variables: {"id": idForMutate, "increment": 1 }})

  const [mutateDel] = useMutation(DELETE_TRAINER, { 
    variables: { "id": idForMutate }, 
    update(cache, { data }) {
        const { pokemons } = cache.readQuery({
          query: GET_POKEMONS
        }) as { pokemons: { trainer: { id: string }}[]}
        const { trainers } = cache.readQuery({
            query: GET_TRAINERS
        }) as { trainers: { 
            id: string
        }[]}
        const { types } = cache.readQuery({ query: GET_TYPES }) as { types: { pokemons: { trainer: {id: string} }[]}[]}
        cache.writeQuery({
            query: GET_TRAINERS,
            data: {
                trainers: trainers.filter((val) => val.id !== data.deleteTrainer.id)
            }
        })
        cache.writeQuery({
            query: GET_TYPES,
            data: {
                types: types.map(val => {
                  return {...val, pokemons: val.pokemons.filter(val => val.trainer.id !== data.deleteTrainer.id)}
                })
            }
        })
        cache.writeQuery({
          query: GET_POKEMONS,
          data: {
            pokemons: pokemons.filter(val => val.trainer.id !== data.deleteTrainer.id)
          }
        })
      }
  })    

  const [mutateMinusBadge] = useMutation(ADD_BADGE, { variables: { "id": idForMutate, "increment": -1 }})

  const [mutateAddPokemon] = useMutation(ADD_POKEMON, { variables: { "name": newPoke.name, "level": Number(newPoke.level), "trainerId": idForMutate, "typeId": newPoke.typeId },
    update(cache, { data }) {
      const { types } = cache.readQuery({
        query: GET_TYPES
      }) as { types: { id: string, pokemons: []}[] }
      cache.writeQuery({
        query: GET_TYPES,
        data: {
          types: types.map(val => val.id === newPoke.typeId? { ...val, pokemons:  [...val.pokemons, data.addPokemon]}: val)
        }
      })
      const { pokemons } = cache.readQuery({
        query: GET_POKEMONS
      }) as { pokemons: [] }
      cache.writeQuery({
        query: GET_POKEMONS,
        data: {
          pokemons: [...pokemons, data.addPokemon]
        }
      })
    }
  })
  

  const delMutationHandler = async() => {
    await mutateDel()
  }
  const addBadgeMutationHandler = async() => {
    await mutateBadgeAdd()
  }

  const subBadgeMutationHandler = async() => {
    await mutateMinusBadge()
  }

  const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNewPoke({level: '', name: '', type: '', typeId: null})
    await mutateAddPokemon()
  }

  if(loading || typeLoading || pokemonLoading) return <div>Loading...</div>
  else
  return (
    <div className = 'flex flex-col'>
      <Title />
      <ul className = 'flex flex-col items-center justify-center'>{(data.trainers as TrainerType[]).map((value, index) => {
        return <li className = 'w-11/12 px-10 py-5 text-gray-500 my-6 rounded-md shadow-md ' key = {index}>
          <div className = 'flex items-end text-gray-600'>
            <div className = 'text-3xl font-bold italic w-full flex items-center gap-3 tracking-wide'>
              {value.name}
              {idForMutate === value.id?<MdAdd onClick = {() => {setIdForMutate(null)}} className = 'rotate-45 cursor-pointer ml-3 text-4xl'/>: <MdEdit onClick = {() => {setIdForMutate(value.id)}} className = 'ml-3 cursor-pointer' />}
              {idForMutate === value.id && <MdOutlineDeleteOutline onClick = {() => {
                delMutationHandler()
              }} className = 'ml-3 cursor-pointer' />}
              
              <hr />
            </div>
          </div>
          <div className = 'flex flex-col my-5'>
            <div className = 'flex items-center gap-3'>
              <SubHeading title = {'Badges'} icon = {SlBadge} />
              {value.id === idForMutate && <MdAdd onClick = {() => {addBadgeMutationHandler()}} className = 'cursor-pointer text-lg' />}
              {value.id === idForMutate && <FiMinus onClick = {() => {subBadgeMutationHandler()}} className = 'cursor-pointer text-lg' />}
            </div>
            <div className = 'ml-6 text-gray-400'>
              {value.badges} badges
            </div>
          </div>
          <div className = 'flex flex-col'>
            <div className = 'flex items-center'>
              <SubHeading title={'Pokemon'} icon = {MdCatchingPokemon} />
              {idForMutate === value.id && <form onSubmit={(e) => {submitHandler(e)}} className = 'ml-3'>
                <label className = 'font-bold italic'>
                  Name:<input value={newPoke.name} onChange={(e) => {nameHandler(e)}} placeholder='Pokemon Name' className = 'ml-3 font-normal indent-2 -skew-x-12 border-2 text-sm py-1 rounded-md focus:outline-gray-400 border-gray-200' />
                </label>
                <label className = 'ml-3 font-bold'>
                  Level:<input value = {newPoke.level} onChange = {(e) => {levelHandler(e)}} placeholder='Pokemon Level' className = 'ml-3 font-normal indent-2 -skew-x-12 border-2 text-sm py-1 rounded-md focus:outline-gray-400 border-gray-200' />
                </label>
                <label className = 'font-bold ml-3'>Type:
                  <select value = {newPoke.type} onChange = {(e) => {
                    const hit = (typeData.types as { id: string, name: string }[]).find((val) => val.name === e.currentTarget.value)
                    setNewPoke({...newPoke, type: e.currentTarget.value, typeId: hit?.id})
                  }} placeholder='Select Type' className = 'px-2 rounded-md py-1 -skew-x-12 text-sm font-normal text-gray-400 focus:outline-gray-400 border-2 border-gray-200 rounder-md ml-3'>
                    <option>Select Type</option>
                    {(typeData.types as { id: string, name: string }[]).map((val, index) => {
                      return <option id = {val.id} key = {index} >{val.name}</option>
                    })}
                  </select>
                </label>
                <button className = 'ml-3 px-3 py-2 font-bold text-sm text-white bg-green-400 -skew-x-12 rounded-r-full'>Add</button>
              </form>}
            </div>
            {value.pokemons.length > 0 && <>
              {value.pokemons.map((pokemon, index) => {
                return <Pokemon parentId = {value.id} id = {pokemon.id} idForMutate = {idForMutate} key={index} name = {pokemon.name} type = {pokemon.type.name} level = {pokemon.level} />
              })}
            </>}
          </div>
        </li>
      })}</ul>
    </div>
  )
}

export default Trainers