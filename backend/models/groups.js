var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
var lineupPlayerSchema = new Schema({
    player: String,
    status: String
});
var lineupSchema = new Schema({
    formation: String,
    players: [lineupPlayerSchema]
});
var teamSchema = new Schema({
    score: Number,
    lineup: lineupSchema,
    team: {type: Schema.Types.ObjectId, ref: 'teams'}
});
var eventSchema = new Schema({
    minute: Number,
    type: String,
    team: String,
},{discriminatorKey: 'type',_id:false});
const event=mongoose.model('eventGroup',eventSchema);

const goalSchema = new Schema({
    scoringPlayer: String,
    assistPlayer: String,
    subtype: String,
});
const substitutionSchema = new Schema({
    joiningPlayer: String,
    leavingPlayer: String,
});
const cartSchema = new Schema({
    cardColor: String,
    bookedPlayer: String,
});

event.discriminator('goalG',goalSchema);
event.discriminator('substitutionG',substitutionSchema);
event.discriminator('cartG',cartSchema);
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
var groupSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    teams: [groupTeamSchema],
    matches: [groupMatchSchema]
});
module.exports = mongoose.model('groups', groupSchema, 'groups');