import React from "react";
import { MdCatchingPokemon } from 'react-icons/md'
export function HeroText({}) {
  return <><div className='text-6xl font-bold text-gray-700 mt-10 ml-10 flex items-end'>
    <MdCatchingPokemon className = 'text-9xl rotate-45' />
    <div className = 'ml-2'>Pokemon Storage System</div>
  </div>
      <p className='text-xl text-gray-400 mt-3 ml-20'>Did Bill use graphQL as well?</p></>;
}
  