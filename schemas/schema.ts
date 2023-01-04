import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLList} from 'graphql'
import pokemonModel from '../models/pokemonModel'
import typeModel from '../models/typeModel'
import trainerModel from '../models/trainerModel'

const PokemonType: GraphQLObjectType = new GraphQLObjectType({
    name: "Pokemon",
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        level: { type: GraphQLInt },
        type: { type: TypeType, resolve(parent, id) {
            const type = typeModel.findById(parent.typeId)
            return type
        }},
        trainer: { type: TrainerType, resolve(parent, id) {
            const trainer = trainerModel.findById(parent.trainerId)
            return trainer
        }}
    })
})

const TrainerType: GraphQLObjectType = new GraphQLObjectType({
    name: "Trainer",
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        badges: { type: GraphQLInt },
        pokemons: { type: GraphQLList(PokemonType), resolve(parent, args) {
            return pokemonModel.find({ trainerId: parent.id })
        } }
    })
})

const TypeType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Type',
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        pokemons: {
            type: new GraphQLList(PokemonType),
            resolve(parent, args) {
                return pokemonModel.find({ typeId: parent.id })
            }
        }
    })
})

const query = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        pokemons: { type: new GraphQLList(PokemonType), resolve(parent, args) { return pokemonModel.find({}) } },
        types: { type: new GraphQLList(TypeType), resolve(parent, args) { return typeModel.find({}) } },
        trainers: { type: new GraphQLList(TrainerType), resolve(parent, args) { return trainerModel.find({}) } },
        pokemon: { type: PokemonType, args: { id: { type: GraphQLID } }, resolve(parent, args) {
            const pokemon = pokemonModel.findById(args.id)
            return pokemon
        }},
        trainer: { type: TrainerType, args: { id: { type: GraphQLID} },resolve(parent, args) {
            const trainer = trainerModel.findById(args.id)
            return trainer
        }},
        type: { type: TypeType, args: { id: { type: GraphQLID } }, resolve(parent, args) {
            const type = typeModel.findById(args.id)
            return type
        }}
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPokemon: {
            type: PokemonType,
            args: {
                trainerId: { type: new GraphQLNonNull(GraphQLID) },
                typeId: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                level: { type: GraphQLInt, defaultValue: 5 }
            },
            resolve(parent, args) {
                const pokemon = pokemonModel.create({ trainerId: args.trainerId, typeId: args.typeId, name: args.name})
                return pokemon
            }
        },
        addTrainer: {
            type: TrainerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                badges: { type: GraphQLInt, defaultValue: 5 }
            },
            resolve(parent, args) {
                const trainer = trainerModel.create({ name: args.name, badges: args.badges })
                return trainer
            }
        },
        addType: {
            type: TypeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const type = typeModel.create({ name: args.name })
                return type
            }
        },
        deletePokemon: {
            type: PokemonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const pokemon = pokemonModel.findByIdAndDelete(args.id)
            }
        },
        deleteTrainer: {
            type: TrainerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const trainer = trainerModel.findByIdAndDelete(args.id)
                return trainer
            }
        },
        deleteType: {
            type: TypeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const type = typeModel.findByIdAndDelete(args.id)
                return type
            }
        },
        addBadge: {
            type: TrainerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                increment: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const trainer = trainerModel.findByIdAndUpdate(args.id, { $inc: { badges: args.increment }}, { new: true })
                return trainer
            }
        },
        addLevel: {
            type: PokemonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                increment: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const pokemon = pokemonModel.findByIdAndUpdate(args.id, { $inc: {level: args.increment }}, { new: true })
                return pokemon
            }
        }
    }
})

export default new GraphQLSchema({
    query,
    mutation
})

// 63b502c03327fbcfac9ebef3
// 63b502ec3327fbcfac9ebef5
// 63b502f43327fbcfac9ebef7

// 63b502783327fbcfac9ebeee
// 63b502713327fbcfac9ebeec
// 63b502853327fbcfac9ebef1