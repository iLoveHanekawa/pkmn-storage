import React from 'react'
import { DocumentNode } from 'graphql'
import { ApolloCache, useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { DELETE_TRAINER, GET_TRAINERS } from '../queries/query'

type BigDeleteProps = {
    setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>
    query: DocumentNode,
    cacheQuery: DocumentNode
    id: string
}

function BigDelete({setShowConfirm, query, cacheQuery, id}: BigDeleteProps) {    
    const [mutate, { data, loading, error }] = useMutation(DELETE_TRAINER, { 
        variables: { "id": id }, 
        update(cache, { data }) {
            const { trainers } = cache.readQuery({
                query: GET_TRAINERS
            }) as { trainers: { 
                id: string
            }[]}
            cache.writeQuery({
                query: GET_TRAINERS,
                data: {
                    trainers: [
                        trainers.filter((val) => val.id !== data.deleteTrainer.id)
                    ]
                }
            })
        }
    })    

    const mutationHandler = async() => {
        await mutate()
    }

  return (
    <div className = 'flex self-end gap-1 items-center text-lg'>
        <div className = 'ml-5 mr-2 text-xl text-gray-500'>Confirm deletion?</div>
        <button onClick = {() => {mutationHandler()}} className = 'bg-green-300 -skew-x-12 px-3 text-white rounded-l-full'>Yes</button>
        <button onClick = {() => {setShowConfirm(false)}} className = 'bg-red-300 -skew-x-12 px-3 text-white rounded-r-full'>No</button>
    </div>
  )
}

export default BigDelete