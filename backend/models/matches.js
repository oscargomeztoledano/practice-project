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
    datails: String
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
const cartSchema = new Schema({
    cardColor: String,
    bookedPlayer: String,
});

event.discriminator('goal',goalSchema);
event.discriminator('substitution',substitutionSchema);
event.discriminator('cart',cartSchema);

var matchSchema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    number: Number,
    stage: String,
    date: Date,
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
