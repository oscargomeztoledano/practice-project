var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    score: Number,
    lineUp: [{formation:String, players:[{player:String, status:String}]}],
    team:[{name:String, players:[{type: Schema.Types.ObjectID, ref:'players'}], coach:String, captain:String, championships:Number, runnersUP:Number, group:String, imageUrl:String}]
});

var eventSchema = new Schema({
    minute: Number,
    type: String,
    team: String,
},{discriminatorKey: 'type',_id:false});
const event=mongoose.model('event',eventSchema);

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
    number: Number,
    stage: String,
    date: String,
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
