import { gql } from "@apollo/client";

export const DELETE_TRAINER = gql`
mutation($id:ID!){
    deleteTrainer(id:$id){
        id
        name
        badges
        pokemons{
            id
            name
            level
            type{
                id
                name
            }
        }
    }
}
`
export const GET_TRAINERS = gql`
{
    trainers{
        id
        name
        badges
        pokemons{
            id
            name
            level
            type{
                id
                name
            }
        }
    }
}
`
export const ADD_TRAINER = gql`
mutation($name:String!, $badges:Int){
    addTrainer(name:$name, badges:$badges){
        id
        name
        badges
        pokemons{
            id
            name
            level
            type{
                name
            }
        }
    }
}
`

export const GET_TRAINER = gql`
query($id:ID!){
    trainer(id:$id){
        id
        name
        pokemons{
            name
            level
        }
    }
}
`

export const GET_POKEMONS = gql`
{
    pokemons{
        id
        level
        type{
            name
        }
        name
        trainer{
            name
            badges
            pokemons{
                name
            }
        }
    }
}
`

export const GET_POKEMON = gql`
query($id:ID!){
    pokemon(id:$id){
        name
        level
        trainer{
            name
            badges
        }
    }
}
`
export const ADD_POKEMON = gql`
mutation($trainerId:ID!, $typeId:ID!, $name:String!){
    addPokemon(trainerId:$trainerId, typeId:$typeId, name:$name){
        name
        type{
            name
        }
        level
        trainer{
            name
        }
    }
}
`
export const DELETE_POKEMON = gql`
mutation($id:ID!){
    deletePokemon(id:$id){
        id
        name
        level
        trainer{
            name
            pokemons{
                name
            }
        }
    }
}
`
export const ADD_TYPE = gql`
mutation($name:String!){
    addType(name:$name){
        name
    }
}
`

export const ADD_LEVEL = gql`
mutation($id:ID!, $increment:Int!){
    addLevel(id:$id, increment:$increment){
      name
      level
      trainer{
        name
        pokemons{
          name
          level
        }
      }
    }
  }
`
export const ADD_BADGE = gql`
mutation($id:ID!, $increment:Int){
    addBadge(id:$id, increment:$increment){
        name
        badges
        pokemons{
            name
            level
        }
    }
}
`
export const GET_TYPES = gql`
{
    types{
        id
        name
        pokemons{
            level
            name
            trainer{
                name
            }
        }
    }
}
`