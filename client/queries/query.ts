import { gql } from "@apollo/client";

export const DELETE_TRAINER = gql`
mutation deleteTrainer($id:ID!){
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
query getTrainers{
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
query getTrainer($id:ID!){
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
query getPokemons{
    pokemons{
        id
        level
        type{
            id
            name
        }
        name
        trainer{
            id
            name
            badges
            pokemons{
                id
                name
            }
        }
    }
}
`

export const GET_POKEMON = gql`
query getPokemon($id:ID!){
    pokemon(id:$id){
        id
        name
        level
        trainer{
            id
            name
            badges
        }
    }
}
`
export const ADD_POKEMON = gql`
mutation addPokemon($trainerId:ID!, $typeId:ID!, $name:String!, $level:Int!){
    addPokemon(trainerId:$trainerId, typeId:$typeId, name:$name, level:$level){
        id
        name
        type{
            id
            name
        }
        level
        trainer{
            pokemons{
                id
                name
            }
            badges
            id
            name
        }
    }
}
`
export const DELETE_POKEMON = gql`
mutation deletePokemon($id:ID!){
    deletePokemon(id:$id){
        id
        name
        level
        trainer{
            badges
            id
            name
            pokemons{
                id
                name
            }
        }
        type{
            id
            pokemons{
                id
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
      id
      type{
        id
      }
      name
      level
      trainer{
        id
        name
        pokemons{
          id
          name
          level
        }
      }
    }
  }
`
export const ADD_BADGE = gql`
mutation($id:ID!, $increment:Int!){
    addBadge(id:$id, increment:$increment){
        id
        name
        badges
        pokemons{
            id
            name
            level
        }
    }
}
`
export const GET_TYPES = gql`
query getTypes{
    types{
        id
        name
        pokemons{
            id
            level
            name
            trainer{
                id
                name
            }
        }
    }
}
`