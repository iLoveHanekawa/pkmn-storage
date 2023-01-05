import React from 'react'
import { ADD_TRAINER, GET_TRAINERS } from '../../queries/query'
import { MdCatchingPokemon, MdAdd } from 'react-icons/md'
import { useMutation } from '@apollo/client'

function Title() {
  
  const [inputs, setInputs] = React.useState({ first: '', second: '' })
  const [mutate, { data, loading, error}] = useMutation(ADD_TRAINER, {
    variables: { "name": inputs.first, "badges": Number(inputs.second) },
    update(cache, { data }) {
      const { trainers } = cache.readQuery({
        query: GET_TRAINERS
      }) as { trainers: {
        id: string
      }[]}
      cache.writeQuery({
        query: GET_TRAINERS,
        data: {
          trainers: [...trainers, data.addTrainer]
        }
      })
    }
  })
  const [renderForm, setRenderForm] = React.useState(false)
  const secondHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, second: e.currentTarget.value })
  }
  const firstHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, first: e.currentTarget.value })
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await mutate()
  }

  return (
    <div className='text-5xl font-bold text-gray-700 mt-10 ml-10 flex items-end'>
        <MdCatchingPokemon className = {`text-8xl transition duration-500 ${!renderForm? 'rotate-45':''}`} />
        <div className = 'ml-2'>Trainers</div>
        <MdAdd onClick = {() => {setRenderForm(i => !i)}} className = {`ml-10 transition duration-500 cursor-pointer ${!renderForm? '':'rotate-45'}`} />
        {renderForm && <form className = 'ml-3 italic font-bold text-gray-500 flex items-center text-lg' onSubmit = {(e) => {submitHandler(e)}}>
          <label className = 'cursor-pointer'>
            Name:
            <input value = {inputs.first} onChange={(e) => {firstHandler(e)}} className='font-normal ml-3 text-base py-1 focus:outline-gray-400 -skew-x-12 border-gray-100 border-2 rounded-md indent-2' placeholder='Trainer name' type="text" />
          </label>
          <label className = ' ml-3 cursor-pointer'>
            Badges:
            <input value = {inputs.second} onChange={(e) => {secondHandler(e)}} className='ml-3 focus:outline-gray-400 font-normal text-base py-1 -skew-x-12 border-gray-100 border-2 rounded-md indent-2' placeholder='Number of badges' type="text" />
          </label>
          <button className = 'ml-3 bg-cyan-400 text-white rounded-r-full -skew-x-12 py-1 px-4'>Add</button>
        </form>}
    </div>
  )
}

export default Title