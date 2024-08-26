var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    score: Number,
    lineup: {formation: String, players: [{player: String, status: String}]},
    team: {_id: {type:Schema.Types.ObjectId, ref: 'teams'}},
});

var eventSchema = new Schema({
    minute: Number,
    type: String,
    team: String,
    details: String
},{discriminatorKey: 'type',_id:false});
const event=mongoose.model('eventMatches',eventSchema);

const goalSchema = new Schema({
    scoringPlayer: String,
    assistingPlayer: String,
});
const substitutionSchema = new Schema({
    joiningPlayer: String,
    leavingPlayer: String,
});
const cardSchema = new Schema({
    cardColor: String,
    bookedPlayer: String,
});

event.discriminator('goal',goalSchema);
event.discriminator('substitution',substitutionSchema);
event.discriminator('card',cardSchema);

var matchSchema = new Schema({
    number: Number,
    stage: String,
    date: String,
    minutesCompleted: Number,
    description: String,
    isFinished: Boolean,
    teamA: teamSchema, 
    temaB: teamSchema,
    matchEvents: [eventSchema],
    winningTeam: String,
    stadium: String,
    city: String
});
module.exports = mongoose.model('matches', matchSchema,'matches');
