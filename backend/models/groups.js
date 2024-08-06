var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupTeamSchema = new Schema({
    team: {_id: {type:Schema.Types.ObjectId, ref: 'teams'}},
    points: Number,
    matchesPlayed: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    goalsScored: Number,
    goalsConceded: Number,
    goalDifference: Number
});

var groupSchema = new Schema({
    _id:  {type:Schema.Types.ObjectId},
    name: String,
    teams: [groupTeamSchema],
    matches: [{_id: {type:Schema.Types.ObjectId, ref: 'matches'}}]
});
module.exports = mongoose.model('groups', groupSchema, 'groups');