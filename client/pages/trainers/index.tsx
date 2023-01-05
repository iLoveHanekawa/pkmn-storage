import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_TRAINERS, DELETE_TRAINER } from '../../queries/query'
import { MdCatchingPokemon, MdOutlineDeleteOutline } from 'react-icons/md'
import { SlBadge } from 'react-icons/sl'
import Title from '../../components/trainers/Title'
import SubHeading from '../../components/trainers/SubHeading'
import Pokemon from '../../components/trainers/Pokemon'

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
  const [ idForDelete, setIdForDelete ] = React.useState<null | string>()
  const [mutate, { data: mutatedData, loading: mutatedLoading, error: mutatedError }] = useMutation(DELETE_TRAINER, { 
    variables: { "id": idForDelete }, 
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

  const mutationHandler = async(id: string) => {
    await mutate()
  }

  console.log(data);
  
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
              <MdOutlineDeleteOutline onClick = {() => {
                if(!idForDelete) setIdForDelete(value.id)
                else setIdForDelete(null)
              }} className = 'ml-3 cursor-pointer' />
              {value.id === idForDelete && <div className = 'flex self-end gap-1 items-center text-lg'>
                  <div className = 'ml-5 mr-2 text-xl text-gray-500'>Confirm deletion?</div>
                  <button onClick = {() => {mutationHandler(value.id)}} className = 'bg-green-300 -skew-x-12 px-3 text-white rounded-l-full'>Yes</button>
                  <button onClick = {() => {setIdForDelete(null)}} className = 'bg-red-300 -skew-x-12 px-3 text-white rounded-r-full'>No</button>
              </div>}
              <hr />
            </div>
          </div>
          <div className = 'flex flex-col my-5'>
            <SubHeading title = {'Badges'} icon = {SlBadge} />
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