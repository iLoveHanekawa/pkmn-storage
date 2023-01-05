import { GiHoodie, GiSmallFire } from 'react-icons/gi'
import { MdCatchingPokemon } from 'react-icons/md'
import Link from 'next/link';

export function Grid({}) {
  return <div className='grid h-96 px-10 py-5 gap-8 mt-10 w-screen grid-cols-3 grid-rows-2'>
        <Link href = '/trainers' className='row-span-2 col-span-1 gridItem bg-red-400'>
            <div className = 'flex items-end gap-1'>
                <GiHoodie className = 'text-6xl'/>
                <div className = 'md:rotate-0 -rotate-90'>Trainers</div>
            </div>
        </Link>
        <Link href = '/pokemons' className='row-span-1 col-span-2 gridItem bg-green-400'>
            <div className = 'flex items-end gap-1'>
                <MdCatchingPokemon className = 'rotate-45 text-6xl' />
                <div>Pokemons</div>
            </div>
        </Link>
        <Link href = '/types' className='row-span-1 col-span-2 gridItem bg-yellow-300'>
            <div className = 'flex items-end gap-1'>
                <GiSmallFire className = 'text-6xl' />
                <div>Types</div>
            </div>
        </Link>
      </div>
}
  