var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    _id: {type:Schema.Types.ObjectId, ref: 'players'},
    name: String,
    team: {type: Schema.Types.ObjectId, ref: 'teams'},
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

var groupSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, ref: 'groups'},
    name: String,
    teams: [groupTeamSchema],
    matches: [{type: Schema.Types.ObjectId, ref: 'matches'}]
});
var groupTeamSchema = new Schema({
    team: {type: Schema.Types.ObjectId, ref: 'teams'},
    points: Number,
    matchesPlayed: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    goalsScored: Number,
    goalsConceded: Number,
    goalDifference: Number
});

var teamSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    players: [playerSchema],
    coach: String,
    captain: String,
    championships: Number,
    runnersUP: Number,
    group: groupSchema,
    imageUrl: String
});

module.redcards = mongoose.model('teams', teamSchema, 'teams');