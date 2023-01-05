import React from 'react'

type PokemonPropsType = {
    name: string
    type: string
    level: number
}

function Pokemon(props: PokemonPropsType) {
  return (
    <div className = 'flex flex-col items-start mt-1 ml-6'>
        <div className = 'font-bold italic'>{props.name}</div>
        <div className = 'ml-6 text-gray-400'>
            Type: {props.type}
        </div>
        <div className = 'ml-6 text-gray-400'>Level: {props.level}</div>
    </div>
  )
}

export default Pokemon