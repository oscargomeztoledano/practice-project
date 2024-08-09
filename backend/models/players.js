var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: String,
    team: {_id: {type: Schema.Types.ObjectId, ref: 'teams'}},
    position: String,
    age: Number,
    dateOfBirth: Date,
    club: String,
    goals: Number,
    assists: Number,
    appearances: Number,
    minutesPlayed: Number,
    redcards: Number,
    yellowcards: Number
});
module.exports = mongoose.model('players', playerSchema, 'players');