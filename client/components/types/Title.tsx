import { MdCatchingPokemon } from "react-icons/md"

function Title() {
  return (
    <div className='text-5xl font-bold text-gray-700 mt-10 ml-10 flex items-end'>
        <MdCatchingPokemon className = 'text-8xl rotate-45' />
        <div className = 'ml-2'>Types</div>
      </div>
  )
}

export default Title