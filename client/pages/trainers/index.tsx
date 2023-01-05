import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_TRAINERS, DELETE_TRAINER, ADD_BADGE, GET_TRAINER } from '../../queries/query'
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
    name: string, 
    level: number, 
    type: { 
      name: string 
    }}[] 
}

function Trainers() {

  const { data, loading, error } = useQuery(GET_TRAINERS)
  const [ idForMutate, setIdForMutate ] = React.useState<null | string>()

  const [mutateBadgeAdd] = useMutation(ADD_BADGE, { variables: {"id": idForMutate, "increment": 1 },
    update(cache, { data }){
      const { trainers } = cache.readQuery({
        query: GET_TRAINERS
      }) as { trainers: { id: string, badges: number }[] }
      cache.writeQuery({
        query: GET_TRAINERS,
        data: {
          trainers: trainers.map(val => val.id === idForMutate? {...val, badges: val.badges + 1}: val)
        }
      })
  }})

  const [mutateDel] = useMutation(DELETE_TRAINER, { 
    variables: { "id": idForMutate }, 
    update(cache, { data }) {
        const { trainers } = cache.readQuery({
            query: GET_TRAINERS
        }) as { trainers: { 
            id: string
        }[]}
        cache.writeQuery({
            query: GET_TRAINERS,
            data: {
                trainers: trainers.filter((val) => val.id !== data.deleteTrainer.id)
            }
        })
      }
  })    

  const [mutateMinusBadge] = useMutation(ADD_BADGE, { variables: { "id": idForMutate, "increment": -1 },
    update(cache, { data }) {
      const { trainers } = cache.readQuery({
        query: GET_TRAINERS
      }) as { trainers: { id: string, badges: number }[]}
      cache.writeQuery({
        query: GET_TRAINERS,
        data: {
          trainers: trainers.map(val => val.id === idForMutate? {...val, badges: val.badges - 1 }: val)
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

  if(loading) return <div>Loading...</div>
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
            <div className = 'ml-6 mt-1 text-gray-400'>
              {value.badges} badges
            </div>
          </div>
          <div className = 'flex flex-col'>
            <div className = 'flex flex-col'>
              <SubHeading title={'Pokemon'} icon = {MdCatchingPokemon} />
            </div>
            {value.pokemons.length > 0 && <>
              {value.pokemons.map((pokemon, index) => {
                return <Pokemon key={index} name = {pokemon.name} type = {pokemon.type.name} level = {pokemon.level} />
              })}
            </>}
          </div>
        </li>
      })}</ul>
    </div>
  )
}

export default Trainers