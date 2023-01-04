"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pokemonSchema = new mongoose_1.default.Schema({
    typeId: { type: String, required: true },
    name: { type: String, required: true },
    trainerId: { type: String, requrired: true },
    level: { type: Number, default: 5 },
});
exports.default = mongoose_1.default.model('pokemon', pokemonSchema);
