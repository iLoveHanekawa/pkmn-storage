import React from 'react'
import { IconType } from 'react-icons/lib'
import { GET_TRAINERS, GET_TYPES, ADD_LEVEL } from '../../queries/query'
import { MdAdd } from 'react-icons/md'
import { useMutation } from '@apollo/client'

type SubHeadingProps = {
    id: string
    edit: string
    icon: IconType
    trainerId: string
    title: string
    value: string | number
}

function SubHeading(props: SubHeadingProps) {
  const [mutateLevel] = useMutation(ADD_LEVEL, {
    variables: { "id": props.id, "increment": 1 },
    update(cache, {data}) {}
  })
  return (
    <>
        <div className = 'flex items-center gap-2 text-lg font-bold'>
            <props.icon className = 'text-2xl' />
            <div>{props.title}</div>{props.title === 'Level' && props.edit === props.id && <MdAdd className = 'cursor-pointer' onClick = {async() => {await mutateLevel()}} />}
        </div>
        <div className = 'ml-6 mb-5 text-gray-400'>{props.value}</div>
    </>
  )
}

export default SubHeading