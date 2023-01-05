"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const pokemonModel_1 = __importDefault(require("../models/pokemonModel"));
const typeModel_1 = __importDefault(require("../models/typeModel"));
const trainerModel_1 = __importDefault(require("../models/trainerModel"));
const PokemonType = new graphql_1.GraphQLObjectType({
    name: "Pokemon",
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLID },
        level: { type: graphql_1.GraphQLInt },
        type: { type: TypeType, resolve(parent, id) {
                const type = typeModel_1.default.findById(parent.typeId);
                return type;
            } },
        trainer: { type: TrainerType, resolve(parent, id) {
                const trainer = trainerModel_1.default.findById(parent.trainerId);
                return trainer;
            } }
    })
});
const TrainerType = new graphql_1.GraphQLObjectType({
    name: "Trainer",
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLID },
        badges: { type: graphql_1.GraphQLInt },
        pokemons: { type: (0, graphql_1.GraphQLList)(PokemonType), resolve(parent, args) {
                return pokemonModel_1.default.find({ trainerId: parent.id });
            } }
    })
});
const TypeType = new graphql_1.GraphQLObjectType({
    name: 'Type',
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLID },
        pokemons: {
            type: new graphql_1.GraphQLList(PokemonType),
            resolve(parent, args) {
                return pokemonModel_1.default.find({ typeId: parent.id });
            }
        }
    })
});
const query = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        pokemons: { type: new graphql_1.GraphQLList(PokemonType), resolve(parent, args) { return pokemonModel_1.default.find({}); } },
        types: { type: new graphql_1.GraphQLList(TypeType), resolve(parent, args) { return typeModel_1.default.find({}); } },
        trainers: { type: new graphql_1.GraphQLList(TrainerType), resolve(parent, args) { return trainerModel_1.default.find({}); } },
        pokemon: { type: PokemonType, args: { id: { type: graphql_1.GraphQLID } }, resolve(parent, args) {
                const pokemon = pokemonModel_1.default.findById(args.id);
                return pokemon;
            } },
        trainer: { type: TrainerType, args: { id: { type: graphql_1.GraphQLID } }, resolve(parent, args) {
                const trainer = trainerModel_1.default.findById(args.id);
                return trainer;
            } },
        type: { type: TypeType, args: { id: { type: graphql_1.GraphQLID } }, resolve(parent, args) {
                const type = typeModel_1.default.findById(args.id);
                return type;
            } }
    }
});
const mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPokemon: {
            type: PokemonType,
            args: {
                trainerId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                typeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                level: { type: graphql_1.GraphQLInt, defaultValue: 5 }
            },
            resolve(parent, args) {
                const pokemon = pokemonModel_1.default.create({ trainerId: args.trainerId, typeId: args.typeId, name: args.name });
                return pokemon;
            }
        },
        addTrainer: {
            type: TrainerType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                badges: { type: graphql_1.GraphQLInt, defaultValue: 5 }
            },
            resolve(parent, args) {
                const trainer = trainerModel_1.default.create({ name: args.name, badges: args.badges });
                return trainer;
            }
        },
        addType: {
            type: TypeType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                const type = typeModel_1.default.create({ name: args.name });
                return type;
            }
        },
        deletePokemon: {
            type: PokemonType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve(parent, args) {
                const pokemon = pokemonModel_1.default.findByIdAndDelete(args.id);
            }
        },
        deleteTrainer: {
            type: TrainerType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const trainer = yield trainerModel_1.default.findByIdAndDelete(args.id);
                    const pokemons = yield pokemonModel_1.default.find({ trainerId: trainer._id });
                    pokemons.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                        yield pokemonModel_1.default.findOneAndDelete({ _id: value._id });
                    }));
                    return trainer;
                });
            }
        },
        deleteType: {
            type: TypeType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                const type = typeModel_1.default.findByIdAndDelete(args.id);
                return type;
            }
        },
        addBadge: {
            type: TrainerType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                increment: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            },
            resolve(parent, args) {
                const trainer = trainerModel_1.default.findByIdAndUpdate(args.id, { $inc: { badges: args.increment } }, { new: true });
                return trainer;
            }
        },
        addLevel: {
            type: PokemonType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                increment: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            },
            resolve(parent, args) {
                const pokemon = pokemonModel_1.default.findByIdAndUpdate(args.id, { $inc: { level: args.increment } }, { new: true });
                return pokemon;
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query,
    mutation
});
// 63b502c03327fbcfac9ebef3
// 63b502ec3327fbcfac9ebef5
// 63b502f43327fbcfac9ebef7
// 63b502783327fbcfac9ebeee
// 63b502713327fbcfac9ebeec
// 63b502853327fbcfac9ebef1
