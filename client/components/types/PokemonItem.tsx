import React from 'react'

type PokemonItemProps = {
    name: string
    level: number
    trainer: string
}

function PokemonItem(props: PokemonItemProps) {
  return (
    <div className = 'text-gray-500'>
        <div className = 'italic font-bold'>{props.name}</div>
        <div className = 'mt-1 ml-6 text-gray-400'>Level: {props.level}</div>
        <div className = 'mt-1 ml-6 text-gray-400'>Trainer: {props.trainer}</div>
    </div>
  )
}

export default PokemonItem