import React from 'react'
import { IconType } from 'react-icons/lib'

type SubHeadingProps = {
    icon: IconType,
    title: string
    value: string | number
}

function SubHeading(props: SubHeadingProps) {
  return (
    <>
        <div className = 'flex items-center gap-2 text-lg font-bold'>
            <props.icon className = 'text-2xl' />
            <div>{props.title}</div>
        </div>
        <div className = 'ml-6 mb-5 text-gray-400'>{props.value}</div>
    </>
  )
}

export default SubHeading