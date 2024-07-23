var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, ref: 'teams'},
    name: String,
    players: [{type: Schema.Types.ObjectId, ref: 'players'}], 
    coach: String,
    captain: String,
    championships: Number,
    runnersUP: Number,
    group: {type: Schema.Types.ObjectId, ref: 'groups'},
    imageUrl: String
});
var playerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    team: teamSchema,
    position: String,
    age: Number,
    dateOfBirth: Date,
    club: String,
    goals: Number,
    assists: Number,
    appearances: Number,
    firstTeamAppearances: Number,
    minutesPlayed: Number,
    redcards: Number,
    yellowcards: Number
});
module.exports = mongoose.model('players', playerSchema, 'players');