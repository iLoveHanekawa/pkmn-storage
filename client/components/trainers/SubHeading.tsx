import { IconType } from "react-icons/lib"

type SubHeadingProps = {
    icon: IconType
    title: "Badges" | "Pokemon"
}

function SubHeading(props: SubHeadingProps) {
  return (
    <div className = 'flex items-center gap-2 text-lg pb-2 font-bold'>
        <props.icon className = 'text-2xl' />
        <div>{props.title}</div>
    </div>
  )
}

export default SubHeading