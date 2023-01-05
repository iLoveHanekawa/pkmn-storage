import React from 'react'

type NameProps = {
    name: string
}

function Name(props: NameProps) {
  return (
    <div className = 'flex items-end text-gray-600'>
        <div className = 'text-3xl font-bold italic w-full tracking-wide'>
            {props.name}
            <hr />
        </div>
    </div>
  )
}

export default Name