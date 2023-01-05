import { MdCatchingPokemon } from "react-icons/md"

type TrainerProps = {
    name: string
    badges: number
    pokemons: {
        name: string
    }[]
}

function Trainer(props: TrainerProps) {
  return (
    <div className = 'flex flex-col'>
        <div className = 'flex items-center gap-2 text-lg font-bold'>
        <MdCatchingPokemon className = 'text-2xl rotate-45' />
        <div>Trainer</div>
        </div>
        <div className = 'mt-1 ml-6 italic font-bold'>{props.name}</div>
        <div className = 'mt-1 ml-12 text-gray-400'>Badges: {props.badges}</div>
        <div className = 'mt-1 ml-12 text-gray-400'>Pokemons: {props.pokemons.map((v, i) => 
        <span key = {i}>{v.name}{i < props.pokemons.length - 1? ', ': ''}</span>
        )}</div>
    </div>
  )
}

export default Trainer