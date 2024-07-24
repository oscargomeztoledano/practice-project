var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lineupPlayerSchema = new Schema({
    player: String,
    status: String
});
var lineupSchema = new Schema({
    formation: String,
    players: [lineupPlayerSchema]
});
var teamDetailsSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, ref: 'teams'},
    name: String,
    players:[{type: Schema.Types.ObjectId, ref: 'players'}],
    coach: String,
    captain: String,
    championships: Number,
    runnersUP: Number,
    group: {type: Schema.Types.ObjectId, ref: 'groups'},
    imageUrl: String
}); 
var teamSchema = new Schema({
    score: Number,
    lineup: lineupSchema,
    team: teamDetailsSchema
});
  

var eventSchema = new Schema({
    minute: Number,
    type: String,
    team: String,
},{discriminatorKey: 'type',_id:false});
const event=mongoose.model('eventMatches',eventSchema);

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

event.discriminator('goal',goalSchema);
event.discriminator('substitution',substitutionSchema);
event.discriminator('cart',cartSchema);

var matchSchema = new Schema({
    _id: Schema.Types.ObjectId,
    number: Number,
    stage: String,
    date: Date,
    minutesCompleted: Number,
    description: String,
    teamA: teamSchema, 
    temaB: teamSchema,
    winningTeam: String,
    stadium: String,
    city: String,
    matchEvents: [eventSchema],
    isFinished: Boolean
});
module.exports = mongoose.model('matches', matchSchema,'matches');
