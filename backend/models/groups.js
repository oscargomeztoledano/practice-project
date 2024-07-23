var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupTeamSchema = new Schema({
    team: teamsSchema,
    points: Number,
    matchesPlayed: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    goalsScored: Number,
    goalsConceded: Number,
    goalDifference: Number
});
var teamsSchema = new Schema({
    _id:{type: Schema.Types.ObjectId, ref: 'teams'},
    name: String,
    players: [{type: Schema.Types.ObjectId, ref: 'players'}],
    coach: String,
    captain: String,
    championships: Number,
    runnersUP: Number,
    group: Schema.Types.ObjectId,
    imageUrl: String
});

var groupMatchSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, ref: 'matches'},
    number: Number,
    stage: String,
    date: Date,
    minutesCompleted: Number,
    description: String,
    teamA: teamSchema,
    teamB: teamSchema,
    winningTeam: String,
    stadium: String,
    city: String,
    events: [eventSchema],
    isFinished: Boolean
});
var teamSchema = new Schema({
    score: Number,
    lineup: lineupSchema,
    team: {type: Schema.Types.ObjectId, ref: 'teams'}
});
var lineupSchema = new Schema({
    formation: String,
    players: [lineupPlayerSchema]
});
var lineupPlayerSchema = new Schema({
    player: String,
    status: String
});
var groupSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    teams: [groupTeamSchema],
    matches: [groupMatchSchema]
});
module.exports = mongoose.model('groups', groupSchema, 'groups');